import { useEffect, useState } from "react";
import CanvasColorPicker from "./CanvasColorPicker";
import { getAiAnswer } from "./AI";
import "./App.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function App() {
  return (
    <>
      <UploadImage />
    </>
  );
}

function HeroSection() {
  return (
    <header className="hero-section">
      <h1 className="hero-title">Fashion Color Matcher</h1>
      <p className="hero-description">
        Upload an image of your clothing item, select its color by touch/click,
        and discover matching outfit ideas to enhance your style. Our AI-driven
        tool suggests complementary colors based on current fashion trends.
      </p>
    </header>
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
        `Based on the selected color ${color} of a ${clothTop}, provide a list of matching ${clothBottom} colors that would complement it and are suitable for office wear or outdoor gatherings. The colors should be versatile, stylish, and appropriate for casual or semi-formal occasions. Please consider current fashion trends and complementary color theory. Provide at least 5 options in the following format: color_name: hex code. Return the colors in a JSON array format where each entry has the color name and hex code.`
      );
      if (ans) {
        try {
          const parsedData = JSON.parse(ans);
          setHelp(parsedData);
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          setHelp([]);
        }
      } else {
        setHelp([]);
      }
    };
    test();
  }, [color]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="upload-section">
      <HeroSection />
      <DotLottieReact
        src="https://lottie.host/ee880564-c392-4b6c-9bb6-f5d5aa076b4d/oLWs38u8DU.json"
        className="lottie-animation"
        loop
        autoplay
      />

      <input type="file" onChange={handleImageUpload} className="file-input" />
      <CanvasColorPicker
        image={image!}
        getColor={(color: string) => {
          setColor(color);
        }}
      />
      <h2 className="suggested-colors-title">Suggested Colors:</h2>
      <div className="color-list">
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
    </div>
  );
}

export default App;
