import { useRef, useState, useEffect } from "react";

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
    //const imageUrl = URL.createObjectURL(image);
    img.src = `${image}`; // replace with your image URL
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      //URL.revokeObjectURL(imageUrl); // Clean up the object URL after use
    };
  }, [image]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onClick={getColorFromCanvas}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      />
      <div style={{ marginTop: "10px" }}>
        Picked Color: <span style={{ color }}>{color}</span>
        <div
          style={{
            backgroundColor: color,
            width: "50px",
            height: "50px",
            display: "inline-block",
            border: "1px solid black",
          }}
        />
      </div>
    </div>
  );
};

export default CanvasColorPicker;
