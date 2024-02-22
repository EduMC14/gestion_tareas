import Header from './components/Header.jsx'
import Tabla from './components/Tabla.jsx'
import Offcanvas from './components/Offcanvas.jsx'
import dayjs from 'dayjs'
import React, { useState, useEffect, useContext } from 'react'
import { RouterContext } from './router.jsx'

export const appContext = React.createContext()

function App () {
  const routerContext = useContext(RouterContext)

  const [tareas, setTareas] = useState([])
  const [fecha, setFecha] = useState(null)
  const [optionFechas, setOptionFechas] = useState({
    hFechas: [],
    indice: null
  })
  const [searchValue, setSearchValue] = useState('')
  /* Estado y funciones para mostrar el canvas modal */

  const [show, setShow] = useState(false)

  async function fetchTareas (date) {
    try {
      const authToken = window.localStorage.getItem('token') // Reemplaza con tu token de autorización real
      const response = await fetch(`http://localhost:3001/tareas/${date}/${routerContext.emailLogued}`, {
        method: 'GET', // O el método que estás utilizando (GET, POST, etc.)
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json' // Puedes ajustar los encabezados según tus necesidades
        }
      })
      const data = await response.json()
      setTareas(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getFechas () {
    const request = await fetch(`http://localhost:3001/fechas/${routerContext.emailLogued}`)
    const response = await request.json()
    setOptionFechas({ ...optionFechas, hFechas: [...response] })
    if (!fecha) {
      setFecha(dayjs(response[0].fecha).format('YYYY-MM-DD'))
    }
    return response
  }

  useEffect(() => {
    console.log('useEfect1')
    getFechas()
  }, [])

  useEffect(() => {
    fetchTareas(fecha)
    console.log('useEfect2')
  }, [fecha])

  return (
    <appContext.Provider value={{ setFecha, fetchTareas, fecha, getFechas, setSearchValue, searchValue }}>

      <div className='div_padre'>
        <Header setShow={setShow} optionFechas={optionFechas} setOptionFechas={setOptionFechas} />
        <div className='div_body'>
          <Offcanvas stateShow={show} setShow={setShow} />
          <Tabla tareas={tareas} />
        </div>
      </div>
    </appContext.Provider>
  )
}

export default App
