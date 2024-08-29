import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Stack from '@mui/material/Stack';
import {HOME,HeaderContainer, StyledButton} from '../styles/home';

const Home = () => {
  return (
    <Layout>
      <HOME>
        <HeaderContainer >
          <h1>Coffee Universe</h1>
          <p>Welcome to the ultimate coffee experience</p>
          <Link to='/menu'>
              <StyledButton 
                variant="outlined" 
                href="#outlined-buttons" 
                sx={{ backgroundColor: "#126874", color: "white", background:"transparent" }}>
                Order Now
              </StyledButton>
          </Link>
        </HeaderContainer>
      </HOME>
    </Layout>
  )
}

export default Home

