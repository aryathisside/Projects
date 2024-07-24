import React, { useEffect, useState } from "react";
import { Context, Score, Form, Heading, EndGame, Button } from "./styles";

const Play = () => {
  const [humanChoice, setHumanChoice] = useState("Rock");
  const [isHumanChoice, setHumanChoiceForm] = useState(false);
  const [compChoice, setCompChoice] = useState();

  const [humanScore, setHumanScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [endGameMessage, setEndGameMessage] = useState("");

  useEffect(() => {
    getComputerChoice();
  });
  const handelHumanChoice = async (event) => {
    event.preventDefault();
    await getComputerChoice();
    await result(humanChoice);
    setHumanChoiceForm(false);
  };

  const result = (humanChoice) => {
    // const choices = ["Rock", "paper", "scissors"];
    let hChoice = humanChoice;
    let cChoice = compChoice;
    console.log("humanChoice", humanChoice, "compChoice", compChoice);
    if (compChoice === humanChoice) {
      setHumanScore((prev) => prev + 1);
    } else {
      setCompScore((prev) => prev + 1);
    }
  };

  const getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3);
    // return choice;

    if (choice === 0) {
      setCompChoice("Rock");
      console.log("compChoice", compChoice);
    } else if (choice === 1) {
      setCompChoice("Paper");
      console.log("compChoice", compChoice);
    } else if (choice === 2) {
      setCompChoice("Scissor");
      console.log("compChoice", compChoice);
    } else {
      console.log("Wrong Choice");
    }
    console.log("compChoice", compChoice);
  };

  const endGame = () => {
    let message = `Final Score is: Human ${humanScore} - Computer ${compScore}. `;
    if (humanScore > compScore) {
      message += `You Won by ${humanScore - compScore} points!`;
    } else {
      message += `You Lost by ${compScore - humanScore} points!`;
    }
    setEndGameMessage(message);
    setHumanScore(0);
    setCompScore(0);
  };

  return (
    <>
      <Context>
        <div>
          {/* <Button class="button-30" onClick={() => setHumanChoiceForm(true)}>Play</Button> */}
          {/* {isHumanChoice && ( */}
          <Heading className="heading">Rock Paper Scissor</Heading>
          <Form onSubmit={handelHumanChoice}>
            {/* <input
              value={humanChoice}
              onChange={(e) => setHumanChoice(e.target.value)}
            /> */}

            <div>
              <select
                value={humanChoice}
                onChange={(e) => setHumanChoice(e.target.value)}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="Rock">Rock</option>
                <option value="Paper">Paper</option>
                <option value="Scissor">Scissor</option>
              </select>{" "}
            </div>
            <button type="submit">Choose</button>
          </Form>
          {/* )} */}
        </div>
        {/* <button onClick={getComputerChoice}>choice</button> */}
      </Context>
      <Score>
        <div className="human">Human Score: {humanScore}</div>
        <div className="computer">Computer Score: {compScore}</div>
      </Score>
      <EndGame>
        <Button onClick={endGame}> End Game</Button>
        {endGameMessage && <p>{endGameMessage}</p>}
      </EndGame>
    </>
  );
};

export default Play;
