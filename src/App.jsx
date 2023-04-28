
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import Tabla from './components/Tabla.jsx';


import { useState, useEffect } from 'react';


function App() {

  const [tareas, setTareas] = useState([]);
  async function fetchTareas() {
    const response = await fetch('http://localhost:3001/tareas');
    const data = await response.json();
    setTareas(data)
  }

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div className='div_padre'>
      <Header />
      <div className='div_body'>
      <Aside />
      <Tabla tareas={tareas} />
      </div>
      
    </div>
      
    
  )
}

export default App
