import styled from "styled-components";
import Banner from '../images/banner.png'
import Button from '@mui/material/Button';


export const HOME = styled.div`
  background-image: url(${Banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center !important;
  }
`;

export const HeaderContainer = styled.div`
    width: auto;
    margin-left: 30px;
    /* background-color: #126874; */
    background-color: rgba(18, 104, 116, 0.8); 
    width:58vh;
    height: 22vh;
    border-radius: 30px;
    text-align: center;

    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px ;
    }

    @media only screen and (max-width: 600px) {
    margin-left: 0;
    border-radius: 10px;
    display: flex;
    border-radius: 30px;

    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;

    h1 {
        font-size: 40px;
    height: 30px;
    margin: 30px 0px;
    color: white;
    }
    p {
        font-size: 30px;
        color: white;
    }
  }

`;

export const StyledButton = styled(Button)`
  border: 2px solid #126874; /* Border color */
  color: white;
  background: transparent;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #126874; /* Ensure border color on hover */
    background: transparent; /* Keep background transparent */
    box-shadow: 0 0 10px 2px rgba(18, 104, 116, 0.8); /* Glowing effect */
  }

  @media only screen and (max-width: 600px) {
    background-color: white;
    color: #121619;
    margin-bottom: 30px;
  }
`;