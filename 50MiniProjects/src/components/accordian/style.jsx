import styled from "styled-components";

export const AccWrapper = styled.div`
  display: flex;
  /* height: 100vh; */
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const Accordian = styled.div`
  width: 500px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: black;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:active {
    background: red; // Change this to any color you like
  }
`;

export const Item = styled.div`
  background: black;
  margin-bottom: 10px;
  padding: 10px 20px;
`;

export const Title = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const AccContent = styled.div`
  color: #ffffff;
  height: auto;
`;
