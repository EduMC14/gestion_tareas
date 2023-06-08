import { useState, useEffect } from 'react'
import logo from '../assets/logo-bitam.svg'
import dayjs from 'dayjs';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../style/theme.js';
import { GlobalStyles } from '../../style/global';
import Toggle from './Toggle'

import Nav from 'react-bootstrap/Nav'





const Header = ({fecha}) => {

    const [optionFechas, setOptionFechas] =  useState([]);

  async function getFechas(){

      const request = await fetch('http://localhost:3001/fechas')

      const response = await request.json();

      setOptionFechas(response);

    }
    
    const [theme, setTheme] = useState('light');

    // The function that toggles between themes
    const toggleTheme = () => {
      // if the theme is not light, then set it to dark
      console.log('desde el evento')
      if (theme === 'light') {
        setTheme('dark');
      // otherwise, it should be light
      } else {
        setTheme('light');
      }
    }

    useEffect( () =>{
      getFechas();
    }, [])

    function setFechaTask(e){
      fecha(e.target.value);
    }


    return (
      <nav className="navbar navbar-expand-lg navbar-text-light" id="navegador">
        <div className="container-fluid">
          <img src={logo} alt="" className="img-bitam" />
          <a className="navbar-brand " href="index.html">
            Gestion De Tareas
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active fs-6">Fecha</a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <select
                  class="form-select form-select-md "
                  aria-label=".form-select-sm example"
                  onChange={setFechaTask}
                >
                  {optionFechas.map((row, index) => (
                    <option
                      value={dayjs(row.fecha).format("YYYY-MM-DD")}
                      key={index}
                    >
                      {dayjs(row.fecha).format("DD/MM/YYYY")}
                    </option>
                  ))}
                </select>
              </li>
              <Nav variant="tabs" defaultActiveKey="/home" className='div_tabs'>
              <Nav.Item className='tabs'>
                <Nav.Link className='text-reset'>Mis Tareas</Nav.Link>
              </Nav.Item>
              <Nav.Item className='tabs'>
                <Nav.Link eventKey="#" className='text-reset'>Asignar Tareas</Nav.Link>
              </Nav.Item>
              <Nav.Item className='tabs'>
                <Nav.Link eventKey="" className='text-reset'>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
            </ul>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
              <>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={toggleTheme} />
              </>
            </ThemeProvider>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Header