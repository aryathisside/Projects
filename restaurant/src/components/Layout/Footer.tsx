import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Divider, Typography } from "@mui/material";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <Box
        sx={{ textAlign: "center", bgcolor:"#126874", width:'1920px',color: "white", p: 3 }}
      >
        <Box
          sx={{
            marginTop:"7px",
            marginBottom:"10px",
            "& svg": {
              fontSize: "60px",
              cursor: "pointer",
              mr: 3,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          {/* icons */}
          <InstagramIcon />
          <TwitterIcon />
          <GitHubIcon />
          <YouTubeIcon />
        <Divider sx={{borderColor:"White",my:5}} />
        </Box>

        <Box sx={{ textAlign: "center", bgcolor:"#126874", color: "white" }}>
        <CenteredTypography
          variant="h5"
          sx={{
              "@media (max-width:600px)": {
                  fontSize: "1rem",
                  fontFamily: "Popstick Regular"
                },
            }}
        >
          All Rights Reserved &copy; AryaThisSide
        </CenteredTypography>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Footer;


export const CenteredTypography = styled(Typography) <{ component?: React.ElementType }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem !important;
  font-family: 'Popstick Regular', sans-serif !important;
  font-weight: bold;
  letter-spacing: 0.1em;
  align-items: center !important;
  margin-top: -30px !important;
  @media (max-width: 600px) {
    font-size: 1rem !important;
  }
`;


export const Wrapper = styled(Box) <{ component?: React.ElementType }>`
    margin-top: 0px;
`