import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';

import  MoonIcon  from '../src/assets/moon.png';
import SunIcon from '../src/assets/sun.png';

const Toggle = ({ theme, toggleTheme }) => {
    const isLight = theme === 'light';
    return (
      <button onClick={toggleTheme} >
        <SunIcon />
        <MoonIcon />
      </button>
    );
  };
  
  Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
  }
  
  export default Toggle;