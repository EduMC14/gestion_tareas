
import Header from './components/Header.jsx'
import Tabla from './components/Tabla.jsx';
import Offcanvas from './components/Offcanvas.jsx';
import dayjs from 'dayjs';
import React from 'react';

export const appContext = React.createContext();


import { useState, useEffect } from 'react';


function App() {
  const [tareas, setTareas] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [optionFechas, setOptionFechas] =  useState({
    hFechas: [],
    indice: null
  });
  const [searchValue, setSearchValue] = useState('');
  /* Estado y funciones para mostrar el canvas modal */

  const [show, setShow] = useState(false);
 

  async function fetchTareas(date) {
    const response = await fetch(`http://localhost:3001/tareas/${date}`);
    const data = await response.json();
    setTareas(data);
    console.log(tareas)
  }
  async function getFechas(){
    const request = await fetch('http://localhost:3001/fechas')
    const response = await request.json();
    setOptionFechas({ ...optionFechas, hFechas: [...response] });
    if (!fecha) {
      setFecha(dayjs(response[0].fecha).format('YYYY-MM-DD'));
    }
    return response
    
  } 
  
  
  useEffect(() => {
    getFechas();
  }, []);

  useEffect(() => {
      fetchTareas(fecha);
  }, [fecha]);

  return (
  <appContext.Provider value={{setFecha, fetchTareas, fecha, getFechas, setSearchValue, searchValue}}>
    {console.log(optionFechas, optionFechas)}
    <div className='div_padre'>
      <Header setShow={setShow} optionFechas={optionFechas} setOptionFechas={setOptionFechas} />
      <div className='div_body'>
      <Offcanvas stateShow={show} setShow={setShow}/>
      <Tabla tareas={tareas} />
      </div>
    </div>
  </appContext.Provider>
  )
}

export default App
