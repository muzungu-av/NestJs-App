import React, { useEffect, useRef } from "react";

interface ImageCanvasProps {
  pic: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ pic }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Explicitly specify the type
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = pic;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.onerror = function (_event) {};
      }
    }
  }, []);
  return <canvas ref={canvasRef} width={500} height={300}></canvas>;
};
export default ImageCanvas;
