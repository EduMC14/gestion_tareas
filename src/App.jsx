
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import Tabla from './components/Tabla.jsx';
import dayjs from 'dayjs';



import { useState, useEffect } from 'react';


function App() {

  const [tareas, setTareas] = useState([]);
  const [fecha, setFecha] = useState(dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DD'));

  /* const [orderAsc, setOrderAsc] = useState(false);
  const [orderDes, setOrderDes] = useState(false); */

  async function fetchTareas() {
    const response = await fetch(`http://localhost:3001/tareas/${fecha}`);
    const data = await response.json();
    setTareas(data)
    console.log(data)
  }

  useEffect(() => {
    fetchTareas();
  }, [fecha]);

  return (
    <div className='div_padre'>
      <Header fecha={setFecha} />
      <div className='div_body'>
      <Aside stateTareas={setTareas} />
      <Tabla tareas={tareas} />
      </div>
      
    </div>
  )
}

export default App
