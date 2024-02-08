import { useState, useContext } from 'react'
import logo from '../assets/logo-bitam.svg'
import dayjs from 'dayjs'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../style/theme.js'
import { GlobalStyles } from '../../style/global'
import Toggle from './Toggle'

import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { appContext } from '../App.jsx'

const Header = ({ setShow, setOptionFechas, optionFechas }) => {
  const contextHeader = useContext(appContext)

  const [theme, setTheme] = useState('light')

  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark')
      // otherwise, it should be light
    } else {
      setTheme('light')
    }
  }

  function setFechaTask (e) {
    setOptionFechas({ ...optionFechas, indice: e.target.id })
    contextHeader.setFecha(e.target.value)
  }

  function setSearch (e) {
    contextHeader.setSearchValue(e.target.value)
  }

  /* Funcion para mostrar el modal */
  const handleShow = () => setShow(true)

  return (
    <nav className='navbar navbar-expand-lg navbar-text-light' id='navegador'>
      <div className='container-fluid'>
        <img src={logo} alt='' className='img-bitam' />
        <a className='navbar-brand ' href='/tareasBitam'>
          Gestion De Tareas
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'

          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active fs-6'>Fecha</a>
            </li>
            <li className='nav-item d-flex align-items-center'>
              <select
                class='form-select form-select-md '
                aria-label='.form-select-sm example'
                onChange={setFechaTask}
              >
                {optionFechas.hFechas.map((row, index) => (
                  <option

                    value={dayjs(row.fecha).format('YYYY-MM-DD')}
                    key={index}
                    id={`${index}`}
                  >
                    {dayjs(row.fecha).format('DD/MM/YYYY')}
                  </option>
                ))}
              </select>
            </li>
            <li className='nav-item d-flex align-items-center mx-2'>
              <Button variant='primary' onClick={handleShow}>
                Agregar Tarea
              </Button>

            </li>
          </ul>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
              <GlobalStyles />
              <Toggle theme={theme} toggleTheme={toggleTheme} />
            </>
          </ThemeProvider>

          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={appContext.searchValue}
              onChange={setSearch}
            />
            <button className='btn btn-outline-primary'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header
