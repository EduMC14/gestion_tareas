import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
// Import a couple of SVG files we'll use in the design: https://www.flaticon.com
import {ReactComponent as SunIcon}from "../assets/sun.svg";
import {ReactComponent as MoonIcon} from "../assets/moon.svg";
import { ToggleContainer } from "../../style/Toggle.styled";


const Toggle = ({ theme, toggleTheme }) => {
const isLight = theme === "light";
return (
  <ToggleContainer onClick={toggleTheme} lightTheme={isLight} >
    <SunIcon className='Moon' />
    <MoonIcon className='Moon'/>
  </ToggleContainer>
    
);
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
