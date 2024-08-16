import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
`;

const Button = styled.button`
  color: black;
  padding: 10px 18px;
  background: yellow;
  border-radius: 5px;
  min-width: 220px;
  border: none;
  font-size: 16px;
  margin-top: -80vh;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.4s background ease-in;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: 0.3s background ease-in;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e6e1e1;
  font-size: 30px;
  margin-top: 50px;
  flex-direction: column;
  gap: 20px;
`;
