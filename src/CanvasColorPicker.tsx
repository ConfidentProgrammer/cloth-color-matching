import { useRef, useState, useEffect } from "react";
import "./CanvasColorPicker.css"; // Importing the CSS file

const CanvasColorPicker = ({
  image,
  getColor,
}: {
  image: string;
  getColor: (color: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#fff");

  const getColorFromCanvas = (event: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setColor(rgbColor);
    getColor(rgbColor);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = `${image}`; // Replace with your image URL
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image]);

  return (
    <div className="color-picker-container">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onClick={getColorFromCanvas}
        className="color-canvas"
      />
      <div className="picked-color-container">
        <span className="picked-color-text">Picked Color:</span>
        <span className="picked-color" style={{ color }}>
          {color}
        </span>
        <div
          className="picked-color-swatch"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default CanvasColorPicker;
