import styled from "styled-components";
import useLocalStorage from "./useLocalStorage"

const LightDarkMode = async () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  const handltToggleTheme = () =>{
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className="light-dark-mode">
      <div className="container"> 
        <p> Hello World!</p>
        <button>Change Theme</button>
      </div>
    </div>
  );
};

export default LightDarkMode;
