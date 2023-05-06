import React from 'react'

const Tabla = ({tareas}) => {
    return (
        <div className='col-md-8' id='div_tabla'>
          <table className="table table-bordered">
      <thead>
        <tr>
          <th scope='col'>Fecha de Creacion</th>
          <th scope="col">Titulo</th>
          <th scope="col">Descripcion</th>
          <th scope='col'>Fecha a entregar</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
      {  tareas.map((row_tarea, index) => (
        <tr  key={index}>
            <th>{row_tarea.create_date}</th>
            <th>{row_tarea.titulo}</th>
            <th>{row_tarea.descripcion}</th>
            <th>{row_tarea.fecha_a_entregar}</th>
            <th>{row_tarea.status}</th>
        </tr>
      ))}
      </tbody>
      </table>
        </div>
      )
}

export default Tabla