import "./App.css";
import { useEffect, useState } from "react";
import CanvasColorPicker from "./CanvasColorPicker";
import { getAiAnswer } from "./AI";
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
  const [help, setHelp] = useState<string | null>(
    "This is where you get suggestions from ai"
  );
  useEffect(() => {
    if (!color) return;
    const test = async () => {
      const ans = await getAiAnswer(
        `Based on the selected color ${color} of a cloth, provide a list of matching pants colors that would complement it. Please consider current fashion trends, complementary color theory, and provide colors in the following format: color_name: hex code. Include at least three options. just give me colors in hex and its name and description in json in format: results:[{color_name: red, hex_code: #fff, description:}]
`
      );
      setHelp(ans);
    };
    test();
  }, [color]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <>
      <input type="file" onChange={handleImageUpload} />
      <CanvasColorPicker
        image={image!}
        getColor={(color: string) => {
          setColor(color);
        }}
      />
      <h2>{help}</h2>
    </>
  );
}

export default App;
