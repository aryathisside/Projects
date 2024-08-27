import styled from "styled-components";


export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
`;

export const Button = styled.button`
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

export const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e6e1e1;
  font-size: 30px;
  margin-top: 50px;
  flex-direction: column;
  gap: 20px;
`;