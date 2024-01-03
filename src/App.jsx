
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import Tabla from './components/Tabla.jsx';
import Offcanvas from './components/Offcanvas.jsx';
import dayjs from 'dayjs';
import React from 'react';

export const fechaContext = React.createContext();


import { useState, useEffect } from 'react';



function App() {
  const [tareas, setTareas] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [recargar, setRecargar] = useState(false);
  const [reFechasHeader, setReFechasHeader] = useState(false);
  const [optionFechas, setOptionFechas] =  useState({
    hFechas: [],
    indice: null
  });
  

  /* Estado y funciones para mostrar el canvas modal */

  const [show, setShow] = useState(false);
 

  async function fetchTareas() {
    console.log(fecha)
    const response = await fetch(`http://localhost:3001/tareas/${fecha}`);
    const data = await response.json();
    setTareas(data);
    if (data.length == 0 && fecha !== null) {
      console.log("Entre")
      console.log(dayjs(optionFechas.hFechas[1].fecha).format('YYYY-MM-DD'))
      setReFechasHeader(!reFechasHeader)
      console.log(optionFechas.hFechas)
      setFecha(dayjs(optionFechas.hFechas[1].fecha).format('YYYY-MM-DD'))
      
    }
  }
  async function getFechas(){
    const request = await fetch('http://localhost:3001/fechas')
    const response = await request.json();
    setOptionFechas({ ...optionFechas, hFechas: [...response] });
    if (!fecha) {
      setFecha(dayjs(response[0].fecha).format('YYYY-MM-DD'));
    }
    
  } 
  
  useEffect(() => {
    getFechas()
  },[reFechasHeader]);

  useEffect(() => {
   fetchTareas();
  }, [fecha, recargar]);

  

  return (
  <fechaContext.Provider value={setFecha}>
    <div className='div_padre'>
      <Header setShow={setShow} reFechas={reFechasHeader} optionFechas={optionFechas} setOptionFechas={setOptionFechas} />
      <div className='div_body'>
      <Offcanvas refresh={setRecargar} stateRe={recargar} stateShow={show} setShow={setShow}
      setReFechasHeader={setReFechasHeader} reFechasHeader={reFechasHeader}/>
      {/* <Aside stateTareas={setTareas} refresh={setRecargar} stateRe={recargar}/> */}
      <Tabla tareas={tareas} refresh={setRecargar} stateRe={recargar} />
      </div>
    </div>
  </fechaContext.Provider>
  )
}

export default App
