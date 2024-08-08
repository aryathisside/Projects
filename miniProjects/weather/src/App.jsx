
import Card from './components/card'

import { createGlobalStyle } from 'styled-components';
import './App.css'
const GlobalStyle = createGlobalStyle`
  body, html {
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: "Inter", sans-serif;
  }
`;


function App() {

  return (
    <>
     <GlobalStyle />
     <Card/>
  </>
  )
}

export default App
