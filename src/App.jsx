
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
  const [fecha, setFecha] = useState(dayjs().format('YYYY-MM-DD'));
  const [recargar, setRecargar] = useState(false);
  

  /* Estado y funciones para mostrar el canvas modal */

  const [show, setShow] = useState(false);


  async function fetchTareas() {
    const response = await fetch(`http://localhost:3001/tareas/${fecha}`);
    const data = await response.json();
    setTareas(data)
  }

  useEffect(() => {
   fetchTareas();
   console.log(fecha)
  }, [fecha, recargar]);

  return (
  <fechaContext.Provider value={setFecha}>
    <div className='div_padre'>
      <Header setShow={setShow} />
      <div className='div_body'>
      <Offcanvas stateTareas={setTareas} refresh={setRecargar} stateRe={recargar} stateShow={show} setShow={setShow}
      fecha={fecha} />
      {/* <Aside stateTareas={setTareas} refresh={setRecargar} stateRe={recargar}/> */}
      <Tabla tareas={tareas} refresh={setRecargar} stateRe={recargar} />
      </div>
    </div>
  </fechaContext.Provider>
  )
}

export default App
