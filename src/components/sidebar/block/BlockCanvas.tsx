import { useEffect, useRef, useState } from "react";
import { Grid, GridItem } from '@chakra-ui/react';
import MintPalette from '@/components/sidebar/block/MintPalette';
import { ColorResult } from "@hello-pangea/color-picker";

export default function BlockCanvas({ colors, onCellClick = () => { }, isEditting = false }:
  { colors: string[], onCellClick?: Function, isEditting?: boolean }) {
  const [newColor, setNewColor] = useState('#FFFFFF')
  const blockCanvas = useRef<HTMLCanvasElement>(null);
  const pixelSize = 20;
  const borderSize = 1;

  useEffect(() => {
    if (blockCanvas.current) {
      const canvas = blockCanvas.current;
      const ctx = canvas.getContext("2d");

      canvas.width = (pixelSize + borderSize) * 10 + borderSize;
      canvas.height = (pixelSize + borderSize) * 10 + borderSize;
      if (ctx) {
        for (let y = 0; y < 10; y++) {
          for (let x = 0; x < 10; x++) {
            const xPos = (pixelSize + borderSize) * x;
            const yPos = (pixelSize + borderSize) * y;

            ctx.fillStyle = colors[x * 10 + y];
            ctx.fillRect(xPos + borderSize, yPos + borderSize, pixelSize, pixelSize);

            const borderColor = "#000000";
            ctx.fillStyle = borderColor;
            if (x == 0) ctx.fillRect(xPos, yPos, borderSize, pixelSize + borderSize);
            if (y == 0) ctx.fillRect(xPos, yPos, pixelSize + borderSize, borderSize);
            ctx.fillRect(xPos + pixelSize + borderSize, yPos, borderSize, pixelSize + borderSize * 2);
            ctx.fillRect(xPos, yPos + pixelSize + borderSize, pixelSize + borderSize * 2, borderSize);
          }
        }
      }
    }
  }, [colors])

  useEffect(() => {
    if (blockCanvas.current) {
      const canvas = blockCanvas.current;
      canvas.addEventListener("click", handleCellClick);
      return () => {
        canvas.removeEventListener("click", handleCellClick)
      };
    }
  }, [newColor])

  const handleChangeColor = (c: ColorResult) => {
    console.log(c.hex)
    setNewColor(c.hex)
  }

  function handleCellClick(event) {
    const canvas = blockCanvas.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let index = Math.floor(x / (pixelSize + borderSize)) * 10 + Math.floor(y / (pixelSize + borderSize))
      if (index > 99) index -= 10; //in case clicking on far right border

      console.log(index)
      onCellClick(index, newColor)
    }
  }

  // function getRandomColor() {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
  return (
    (isEditting) ?
      (<Grid justifyContent="center" width="100%" templateRows="3fr 1fr" gap={5}>
        <GridItem justifySelf="center">
          {/*blockGrid(colors)*/}
          <canvas ref={blockCanvas} style={{ cursor: 'pointer' }} />
        </GridItem>
        <GridItem justifySelf="center">
          <MintPalette color={newColor} onClick={handleChangeColor} />

        </GridItem>
      </Grid>) : (<canvas ref={blockCanvas} />)
  )
}