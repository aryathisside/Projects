import React, { useState, useEffect } from "react";
import { Wrapper, Button, Text } from "./style";
const ColorChange = () => {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (colorType === "rgb") randomRGB();
    else randomHexColor();
  }, [colorType]);

  const handleRandColor = (length) => {
    return Math.floor(Math.random() * length);
  };

  const randomHexColor = () => {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[handleRandColor(hex.length)];
    }
    setColor(color);
  };

  const randomRGB = () => {
    const r = handleRandColor(256);
    const g = handleRandColor(256);
    const b = handleRandColor(256);

    setColor(`rgb(${r},${g}, ${b})`);
  };

  return (
    <>
      <Wrapper color={color}>
        <Button onClick={() => setColorType("hex")}>Hex Color</Button>
        <Button onClick={() => setColorType("rgb")}>RGB</Button>
        <Button onClick={colorType === "hex" ? randomHexColor : randomRGB}>
          Random Color
        </Button>
        <Text>
          
          {/* <h3>{colorType === "rgb" ? "RGB Color" : "Hex Color"}</h3> */}
          {/* <h2>{color}</h2> */}
        </Text>
      </Wrapper>
    </>
  );
};

export default ColorChange;


