
import { createGlobalStyle } from 'styled-components'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export const GlobalStyle = createGlobalStyle`
      html {
        height: 100%;
           }

      body {

      display: flex;
      justify-content: center;
      background-color: #000000;
      font-size: 2em;
      color: white;
            }
`;