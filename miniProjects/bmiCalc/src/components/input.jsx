import React, { useState } from "react";
import styled from "styled-components";
const Input = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [bmi, setBmi] = useState(0.0);

  const handleInputs = (e) => {
    e.preventDefault();
    calcBmi(weight, height);
  };

  const handleReload = (e) => {
    e.preventDefault();
    setWeight(0);
    setHeight(0);
    setMessage("");
    setBmi(0.0);
  };

  const calcBmi = (weight, height) => {
    let hght = height / 100;
    if (weight === 0 || height === 0) {
      alert("Please enter your weight and height");
    } else {
      const bmi = weight / (hght * hght);
      setBmi(parseFloat(bmi).toFixed(2));
      if (bmi > 30.0) {
        setMessage("Obesity");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setMessage("Overweight");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setMessage("Normal Weight");
      } else if (bmi < 18.5) {
        setMessage("Under Weight");
      } else {
        setMessage("Invalid");
      }
    }
  };

  return (
    <>
    <Wrapper>

      <Content>
        <Heading>
          <h1>BMI Calculator</h1>
        </Heading>
        <Form onSubmit={handleInputs}>
          <label className="label" htmlFor="Weight">
            <h3>Weight:(Kg) </h3>
          </label>
          <input
            type="number"
            id="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
          />

          <label htmlFor="Height" className="label">
            <h3>Height:(cm) </h3>
          </label>
          <input
            type="number"
            id = "Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Weight"
          />
          <button type="submit">SUBMIT</button>
          <button type="button" onClick={handleReload}>RELOAD</button>
        </Form>
        <Message>
          <h3>BMI: {bmi}</h3>
          <p>{message}</p>
        </Message>
      </Content>
    </Wrapper>

    </>
  );
};

export default Input;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const Heading = styled.div`
  margin-bottom: 1rem;
  color: #fff;

`;

const Content = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #000;
  /* gap: 10/; */
`;

const Form = styled.form`
  display: flex;
  color: #fff;
  flex-direction: column;
  width: 300px;
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 30vh; */
  .label {
    margin: 1rem;
  }

  input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }


  button {
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  button[type="button"] {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;


const Message = styled.div`
  color: #fff;
  margin-top: 1rem;
  text-align: center;
`;
