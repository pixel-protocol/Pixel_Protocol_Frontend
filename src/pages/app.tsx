import type { NextPage } from 'next'
import { useState, useEffect, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from "@/components/Header"
import { io } from "socket.io-client";
import { Coordinates, Mode } from '@/constant/types';
import { FloatingMenu } from '@/components/FloatingMenu'
import Pill from '@/components/Pill'

const socket = process.env.dev ? io("http://localhost:8000/") : io("d3perkfc3597u7.cloudfront.net");
const BLOCK_SIZE = 10;

const Home: NextPage = () => {



  const dragStart = useRef<any>(null);
  const pinched = useRef(false);
  const [cameraZoom, setCameraZoom] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [pointerPosition, setPointerPosition] = useState<Coordinates | null>(null);
  const [selectedPointerPosition, setSelectedPointerPosition] = useState<Coordinates | null>(null);
  const [c, setC] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageData = useRef<ImageData | null>(null);
  const offscreenCanvas = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<Mode>('Pixel')
  const startMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!!window && !!selectedPointerPosition) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('x', selectedPointerPosition.x.toString());
      searchParams.set('y', selectedPointerPosition.y.toString());
      searchParams.set('mode', mode);

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [selectedPointerPosition, mode])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const x = searchParams.get('x');
    const y = searchParams.get('y');
    const mode = searchParams.get('mode');
    if (x !== null && y !== null) {
      moveToPoint(parseInt(x), parseInt(y));
      setMode(mode ? mode as Mode : 'Pixel');
    }
  }, [])

  const toggleMode = () => {
    setMode((mode === "Pixel") ? "Block" : "Pixel");
    setPointerPosition(null);
    setSelectedPointerPosition(null);
  }

  const redraw = useRef(() => {
    requestAnimationFrame(redraw.current);
  });


  const calculateRealPosition = (ptX: number, ptY: number) => {
    if (!ctx) {
      const x = -1;
      const y = -1;
      return { x, y }
    }
    const T_p = ctx.getTransform().invertSelf();
    const x = Math.round(ptX * T_p.a + ptY * T_p.c + T_p.e - 0.5);
    const y = Math.round(ptX * T_p.b + ptY * T_p.d + T_p.f - 0.5);
    return { x, y };
  }

  const adjustZoom = (zoomAmount: number, zoomPt: Coordinates) => {
    const newZoom = Math.min(Math.max(cameraZoom + zoomAmount, 0.5), 25);
    if (newZoom == cameraZoom) return;

    const scaleDelta = newZoom - cameraZoom
    setCameraZoom(newZoom);

    if (zoomPt != null) {
      setLastX((prevLastX) => prevLastX - (zoomPt.x * scaleDelta) / newZoom)
      setLastY((prevLastY) => prevLastY - (zoomPt.y * scaleDelta) / newZoom)
    }
  }

  const moveToPoint = (x: number, y: number) => {
    if (selectedPointerPosition && selectedPointerPosition.x == x && selectedPointerPosition.y == y) {
      setSelectedPointerPosition(null);
      setPointerPosition(null);
      return
    }

    if (x < 0 || x >= 1000 || y < 0 || y >= 1000) return;

    if (mode === "Block") {
      const bx = Math.min(Math.max(0, Math.floor(x / BLOCK_SIZE)), 99);
      const by = Math.min(Math.max(0, Math.floor(y / BLOCK_SIZE)), 99);
      setSelectedPointerPosition({ x: bx, y: by });
    } else {
      setSelectedPointerPosition({ x, y });
    }

    setLastX(-x + window.innerWidth / (2 * 25));
    setLastY(-y + window.innerHeight / (2 * 25));
    setCameraZoom(25);
  }

  useGesture({
    onWheel: ({ pinching, event }) => {
      if (pinching) return;

      const zoomFactor = event.deltaY * 0.01
      const x = event.offsetX || event.pageX;
      const y = event.offsetY || event.pageY;

      adjustZoom(zoomFactor, { x: x / cameraZoom, y: y / cameraZoom })
    },
    onPinchStart: () => {
      pinched.current = true;
    },
    onPinch: ({ offset, delta, event }) => {
      const zoomFactor = delta[0] / offset[0];
      const x = event.offsetX || event.pageX;
      const y = event.offsetY || event.pageY;
      adjustZoom(zoomFactor, { x: x / cameraZoom, y: y / cameraZoom })
    },
    onPinchEnd: () => {
      pinched.current = false;
    }
  },
    {
      target: canvasRef,
      eventOptions: {
        passive: false
      },
      pinch: {
        preventDefault: true,
      },
      wheel: {
        preventDefault: true,
        threshold: 10
      }
    }
  )


  useEffect(() => {
    const canvas = document.getElementById("pixelCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setC(canvas);
    setCtx(ctx);
    setLastX(window.innerWidth / 2 - 500)
    setLastY(window.innerHeight / 2 - 500)

    offscreenCanvas.current = document.createElement('canvas');
    offscreenCanvas.current.width = 1000;
    offscreenCanvas.current.height = 1000;

    redraw.current();

    socket.on("canvas", (data) => {
      const dataArr = new Uint8Array(data);

      const arr = new Uint8ClampedArray(4000000);
      for (let i = 0; i < 3000000; i += 3) {
        const idx = Math.floor(i / 3) * 4;
        arr[idx] = dataArr[i];
        arr[idx + 1] = dataArr[i + 1];
        arr[idx + 2] = dataArr[i + 2];
        arr[idx + 3] = 1;
      }
      console.log("Data: ")
      console.log(arr)
      imageData.current = new ImageData(arr, 1000, 1000);
      offscreenCanvas.current.getContext('2d').putImageData(imageData.current, 0, 0);
    })
    socket.on("colorChange", (data) => {
      const ids = data.ids; const colors = data.rgb;

      if (imageData.current) {
        for (let i = 0; i < ids.length; i++) {
          imageData.current.data[ids[i] * 4] = colors[0];
          imageData.current.data[ids[i] * 4 + 1] = colors[1];
          imageData.current.data[ids[i] * 4 + 2] = colors[2];
          imageData.current.data[ids[i] * 4 + 3] = 1;

        }
        offscreenCanvas.current.getContext('2d').putImageData(imageData.current, 0, 0);
      }
      else {
        socket.emit("requestCanvas")
      }

    })
  }, []);



  useEffect(() => {
    if (ctx == null || c == null) return;

    redraw.current = () => {
      if (ctx == null || c == null) {
        requestAnimationFrame(redraw.current);
        return;
      };

      c.width = window.innerWidth
      c.height = window.innerHeight


      ctx.scale(cameraZoom, cameraZoom)
      ctx.translate(lastX, lastY)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)


      //So that canvas won't be blurred on zoom
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(offscreenCanvas.current, 0, 0);

      if (mode === "Block") {
        if (pointerPosition !== null) {
          ctx.strokeStyle = 'rgb(255, 255, 0)';
          ctx.lineWidth = 0.2
          ctx.rect(pointerPosition.x * BLOCK_SIZE, pointerPosition.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.stroke();
        }

        if (selectedPointerPosition !== null) {
          ctx.strokeStyle = 'rgb(255, 255, 0)';
          ctx.lineWidth = 0.2
          ctx.rect(selectedPointerPosition.x * BLOCK_SIZE, selectedPointerPosition.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.stroke();
        }
      } else {
        if (pointerPosition !== null) {
          ctx.strokeStyle = 'rgb(255, 255, 0)';
          ctx.lineWidth = 0.2
          ctx.rect(pointerPosition.x, pointerPosition.y, 1, 1);
          ctx.stroke();
        }

        if (selectedPointerPosition !== null) {
          ctx.strokeStyle = 'rgb(255, 255, 0)';
          ctx.lineWidth = 0.2
          ctx.rect(selectedPointerPosition.x, selectedPointerPosition.y, 1, 1);
          ctx.stroke();
        }
      }


      requestAnimationFrame(redraw.current);
    };

  }, [ctx, c, lastX, lastY, cameraZoom, pointerPosition, selectedPointerPosition, mode])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    dragStart.current = { x: e.clientX / cameraZoom - lastX, y: e.clientY / cameraZoom - lastY };
    startMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (startMousePosition.current.x === e.clientX && startMousePosition.current.y === e.clientY) {
      const { x, y } = calculateRealPosition(e.clientX, e.clientY);
      moveToPoint(x, y);
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      const deltaX = e.clientX / cameraZoom - dragStart.current.x;
      const deltaY = e.clientY / cameraZoom - dragStart.current.y;
      setLastX(deltaX);
      setLastY(deltaY);
    } else {
      const { x, y } = calculateRealPosition(e.clientX, e.clientY);
      if (mode === "Block") {
        if (0 <= x && x < 1000 && 0 <= y && y < 1000) {
          const bx = Math.min(Math.max(0, Math.floor(x / BLOCK_SIZE)), 99);
          const by = Math.min(Math.max(0, Math.floor(y / BLOCK_SIZE)), 99);

          setPointerPosition({ x: bx, y: by });
        }

      } else {
        if (0 <= x && x < 1000 && 0 <= y && y < 1000) {
          setPointerPosition({ x, y });
        }
      }
    }
  };

  return (
    < div >
      <Header />

      <FloatingMenu mode={mode} toggleMode={toggleMode} />

      <div id="canvas-container" className='bg-slate-300' style={{ overflow: 'hidden', height: '100vh' }}>
        <canvas id="pixelCanvas" width={1000} height={1000} style={{ imageRendering: 'pixelated', touchAction: 'none' }} ref={canvasRef}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></canvas>
      </div>
      <Pill pointerPosition={selectedPointerPosition as Coordinates} cameraZoom={cameraZoom} moveToPoint={moveToPoint} />


      {
        (selectedPointerPosition !== null || process.env.exposeSidebar) ? <Sidebar mode={mode} setPointerPosition={setPointerPosition} pointerPosition={pointerPosition as Coordinates} />
          : null
      }

    </div >

  )
}

export default Home;
