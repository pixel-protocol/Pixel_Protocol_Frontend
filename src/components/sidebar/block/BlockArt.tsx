import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react'

function BlockArt({ colors }: { colors: Array<string> }): JSX.Element {
  const blockArtCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (blockArtCanvasRef.current) {
      const canvas = blockArtCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const gridSize = 10; // Number of squares in each row and column
      const squareSize = 8; // Size of each square in pixels
      const canvasSize = gridSize * squareSize; // Total canvas size

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the grid of squares
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            const randomColor = colors[x * gridSize + y];
            ctx.fillStyle = randomColor;
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
          }
        }
      }
    }
  }, []);

  return (<Box
    w="84px"
    h="84px"
    borderRadius="lg"
    border="2px solid"
    borderColor="gray.500"
    overflow="hidden"
  ><canvas ref={blockArtCanvasRef} width={80} height={80} /></Box>);
}

export default BlockArt;