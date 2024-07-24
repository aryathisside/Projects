import styled from "styled-components";

export const Context = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .human {
    color: #228B22; /* Forest Green */
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 1px 1px 2px #000; /* Adding shadow for a 3D effect */
  }

  .computer {
    color: #FF6347; /* Tomato */
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 1px 1px 2px #000; /* Adding shadow for a 3D effect */
  }
`;

export const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: #f0f0f5; /* Slightly off-white for better contrast */
  border-radius: 8px; /* More rounded corners */
  border: 2px solid #dcdcdc; /* Adding a subtle border */
  box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 6px 12px -2px, #e6e6fa 0 -3px 0 inset;
  box-sizing: border-box;
  color: #4b4b82; /* Darker shade for text */
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  text-align: center; /* Center align text */
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 20px; /* Slightly larger font size */
  
  &:focus {
    box-shadow: #e6e6fa 0 0 0 2px inset, rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e6e6fa 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 6px 12px, rgba(45, 35, 66, 0.3) 0 8px 16px -4px, #e6e6fa 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #e6e6fa 0 4px 8px inset;
    transform: translateY(2px);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 6px 12px -2px, #e6e6fa 0 -3px 0 inset;
  width: 300px;
  margin: 20px auto;

  select {
    font-family: 'JetBrains Mono', monospace;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #dcdcdc;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
  }

  button {
    align-items: center;
    appearance: none;
    background-color: #f0f0f5;
    border-radius: 8px;
    border: 2px solid #dcdcdc;
    box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 6px 12px -2px, #e6e6fa 0 -3px 0 inset;
    box-sizing: border-box;
    color: #4b4b82;
    cursor: pointer;
    display: inline-flex;
    font-family: 'JetBrains Mono', monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: box-shadow 0.2s, transform 0.2s;
    user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 20px;

    &:focus {
      box-shadow: #e6e6fa 0 0 0 2px inset, rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e6e6fa 0 -3px 0 inset;
    }

    &:hover {
      box-shadow: rgba(45, 35, 66, 0.4) 0 6px 12px, rgba(45, 35, 66, 0.3) 0 8px 16px -4px, #e6e6fa 0 -3px 0 inset;
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: #e6e6fa 0 4px 8px inset;
      transform: translateY(2px);
    }
  }`
export const Heading = styled.div`
font-family: 'JetBrains Mono', monospace;
font-size: 3rem; /* Large font size for emphasis */
font-weight: bold;
color: #4b4b82; /* Dark shade for better visibility */
text-align: center;
margin: 20px 0; /* Space around the heading */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
`;

export const EndGame = styled.div`
font-family: 'JetBrains Mono', monospace;
font-size: 3rem; /* Large font size for emphasis */
font-weight: bold;
color: #4b4b82; /* Dark shade for better visibility */
text-align: center;
margin: 20px 0; /* Space around the heading */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
`;