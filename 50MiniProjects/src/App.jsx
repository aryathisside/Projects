import { useState } from "react";
import styled from "styled-components";
import AccordianDump from "./components/accordian/index2";
import ColorChange from "./components/colorChange/ColorChange";
import StarRating from "./components/starRating/star";
function App() {
  const [showAccordian, setShowAccordian] = useState(false);
  const [showColorPage, setShowColorPage] = useState(false);
  const [starPage, setShowStarPage] = useState(false);
  return (
    <>
      <Wrapper>
        <Acc>
          <Button onClick={() => setShowAccordian(!showAccordian)}> Accordian</Button>
        </Acc>
        {/* <Accordian/>  */}
        {showAccordian ? <AccordianDump /> : ""}
        {/* <Color> */}
        
        <Button onClick={() => setShowColorPage(!showColorPage)}>Color Page</Button>
        {/* </Color> */}
        {showColorPage ? <ColorChange /> : ""}

        <Button onClick={() => setShowStarPage(!starPage)}>Star Rating</Button>
        {/* </Color> */}
        {starPage ? <StarRating noOfStars={10}  /> : ""}

      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  gap: 10px;
`;

const Acc = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* padding: 10px 20px; */
  align-items: center;
  /* gap: 20px; */
  justify-content: space-between;
  /* margin-bottom: 10px; */
  width: 100%;
  height: 10vh;
`;



const Button = styled.button`
  /* padding: 10px 20px;
  background: #614101;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer; */
  color: black;
  padding: 10px 18px;
  background: lightgrey;
  border-radius: 5px;
  min-width: 220px;
  border: none;
  font-size: 16px;
  margin-top: 5vh;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.4s background ease-in;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
    transition: 0.3s background ease-in;
  }
`;
