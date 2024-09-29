import { useEffect, useState } from "react";
import CanvasColorPicker from "./CanvasColorPicker";
import { getAiAnswer } from "./AI";
import "./App.css";

function App() {
  return (
    <>
      <UploadImage />
    </>
  );
}

function UploadImage() {
  const [image, setImage] = useState<string>();
  const [color, setColor] = useState("");
  const [clothTop] = useState("Tshirt");
  const [clothBottom] = useState("Pant");
  const [help, setHelp] = useState<
    { color_name: string; hex_code: string; description: string }[]
  >([]);
  useEffect(() => {
    if (!color) return;
    const test = async () => {
      const ans = await getAiAnswer(
        `Based on the selected color ${color} of a ${clothTop}, provide a list of matching ${clothBottom} neutral colors that would complement it and looks casual. Please consider current fashion trends, complementary color theory, and provide colors in the following format: color_name: hex code. Include at least 5 options. just give me colors in hex in json array format where it has color name and hex code
`
      );
      if (ans) {
        try {
          // Parse the string to a JavaScript object or array
          const parsedData = JSON.parse(ans);
          setHelp(parsedData); // Set the parsed array directly
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          setHelp([]); // Set an empty array or a fallback value in case of an error
        }
      } else {
        setHelp([]); // Fallback if no data is available
      }
    };
    test();
  }, [color]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <>
      <input type="file" onChange={handleImageUpload} className="file-input" />
      <CanvasColorPicker
        image={image!}
        getColor={(color: string) => {
          setColor(color);
        }}
      />
      <h2 className="suggested-colors-title">Suggested Colors:</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {help.map((item, index) => (
          <div key={index} className="color-item">
            <h4 className="color-name">{item.color_name}</h4>
            <div
              className="color-swatch"
              style={{
                backgroundColor: item.hex_code,
              }}
            />
            <p className="hex-code">Hex Code: {item.hex_code}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
