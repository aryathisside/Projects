import styled,{createGlobalStyle} from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #7edeec;
`;

export const DATE = styled.div`
  color: #2a2929;
  margin-top: 20px;
  opacity: 47%;
  font-size: 22px;
  font-weight: 400;
`;

export const CITY = styled.div`
  /* margin: 0.5rem 0; */
  margin-top: 1rem;
  font-size: 37px;
  font-weight: 700;
  color: white;
`;

export const Temp = styled.div`
  margin: 0.5rem 0;
`;

export const Weather = styled.div`
  margin: 0.1rem 0;
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const IMG = styled.img`
  position: relative;
  top: -29px;
`;
export const FORM = styled.form`
  margin-top: 3rem;
  input {
    border: none;
    padding: 1rem;
    border-radius: 0px 0px 0px 15px;
    background: #e8e8e8;
    /* box-shadow: 20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff; */
    transition: 0.3s;
    position: relative;
    top: -2px;
  }
  input:focus {
    outline-color: #e8e8e8;
    background: #e8e8e8;
    box-shadow: inset 20px 20px 60px #e8e8e8, inset -20px -20px 60px #ffffff;
    transition: 0.3s;
  }

  button {
    color: #090909;
    padding: 0.7em 0.7em;
    font-size: 18px;
    /* border-radius: 0.5em; */
    /* background: #e8e8e8; */
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
  }

  button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }
`;
