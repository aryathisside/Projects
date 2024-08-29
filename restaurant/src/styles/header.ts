import styled from "styled-components";
import { Box, Typography } from '@mui/material'


export const UL = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  
  li {
    a {
      text-decoration: none;
      color: white;
    }
  }

    @media (max-width: 1100px) {
      display: none;
    }
  
`;

export const UlDrawer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 33px;
  margin: 0;
  padding: 0;
  font-size: 25px;
  li {
    a {
      text-decoration: none;
      color: white;
    }
  }
  
`;

export const CenteredTypography = styled(Typography) <{ component?: React.ElementType }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px !important;
  font-family: 'Popstick Regular', sans-serif !important;
  font-weight: bold;
  letter-spacing: 0.1em;
  align-items: center !important;
  margin-top: -38px !important;
`;


export const BoxWithBorder = styled(Box) <{ component?: React.ElementType }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 50px 95px; /* Adjust padding as needed */
  border: 2px solid white; /* Adjust border color and width as needed */
  border-radius: 50px; /* Optional: adjust border radius */
  /* background-color: rgba(255, 255, 255, 0.2);  */
  margin-top: -20px !important;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 50%, grey 50%);
  /* Optional: semi-transparent background */
  /* Responsive adjustments */
  &:hover {
    background-color: black;
    color: #e0e0e0;
  }
  @media (max-width: 1200px) {
    padding: 29px 92px;
    border-radius: 30px;
    margin-top: -32px !important; 
    font-size: 4px !important;
  }

  @media (max-width: 900px) {
    padding: 27px 92px;
    border-radius: 30px;
    margin-top: -29px !important; 

  }

  @media (max-width: 600px) {
    padding: 30px 90px;
    margin-top: -31px !important;
  }

  @media (max-width: 400px) {
    padding: 28px 90px;
    /* border-radius: 5px; */
    margin-top: -28px !important;
    font-size: 10px !important;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const CenteredTypographyDrawer = styled(Typography) <{ component?: React.ElementType }>`
  font-family: 'Popstick Regular', sans-serif !important;
  font-weight: bold;
  font-size: 40px !important; 
  text-align: center; 
  color: white; 
  margin-top: 10px;
  gap: 10px !important;
`;
export const BoxWithBorderDrawer = styled(Box) <{ component?: React.ElementType }>`

  padding: 10px 5px;
  border: 2px solid white; 
  border-radius: 50px; 
  background-color: rgba(255, 255, 255, 0.2); 
  margin-left: -5px;
  text-align: center;
  width: 100%; 
  box-sizing: border-box; 
  gap: 200px !important;
  &:hover {
    background-color: black;
    color: #e0e0e0;
  }
`