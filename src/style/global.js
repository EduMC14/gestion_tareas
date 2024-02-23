// global.js
// Source: https://github.com/maximakymenko/react-day-night-toggle-app/blob/master/src/global.js#L23-L41

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  
  .navbar{
    background-color:${({ theme }) => theme.header};
    color:${({ theme }) => theme.color};
    transition: all 0.25s linear;
  }
  
  .navbar-brand{
    color:${({ theme }) => theme.color_header};
    transition: all 0.25s linear;
  } 

  .div_body{
    height: 91%;
    width: 100%;
    background-color:${({ theme }) => theme.body_box};
}

  #div_tabla{
    width: 74%;
    overflow: scroll;
    background-color: ${({ theme }) => theme.bg_table};
    transition: all 0.25s linear;
    
}
  table{
    color:${({ theme }) => theme.color_table};
    transition: all 0.25s linear;
  }

  .row-verde {
    background-color: ${({ theme }) => theme.row_verde};
    transition: all 0.25s linear;
    }

    .row-azul{
      background-color: ${({ theme }) => theme.row_azul};
      transition: all 0.25s linear;
  }
  
  .row-rojo{
      background-color: ${({ theme }) => theme.row_rojo};
      transition: all 0.25s linear;
  } 

  .div_form{
    color:${({ theme }) => theme.color_aside};
    background-color:${({ theme }) => theme.bg_aside};
    transition: all 0.25s linear;
}

.box_canvas_header{
  color:${({ theme }) => theme.color_aside};
    background-color:${({ theme }) => theme.bg_aside};
    transition: all 0.25s linear;
}

.date-picker-wrapper .MuiInputBase-root {
  background-color: ${({ theme }) => theme.bg_picker};
  color: ${({ theme }) => theme.color_picker} ;
  transition: all 0.25s linear;
  }

.Moon{
  width:25px;
}

.modal-hea-foo{
  background-color: ${({ theme }) => theme.bg_hea_foo};
  color: ${({ theme }) => theme.color_picker}
}

.modal-body{
  background-color: ${({ theme }) => theme.body_box}
}
  `
