import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import ModalEdit from './ModalEdit';
import dayjs from 'dayjs';



const Tabla = ({tareas}) => {

  const [idUpdate, setIdUpdate] = useState('');
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setIdUpdate(id)
  }

  

  function deleteRow(id) {

    axios.delete(`http://localhost:3001/deleteRow/${id}`).then((res) => {
      console.log(res.data)
    }
    ).catch(error => {
      console.log(error)
    })

  }



  return (
    <div className="col-md-8" id="div_tabla">
      <ModalEdit id={idUpdate} show={show} close={handleClose}/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Fecha de Creacion</th>
            <th scope="col">Titulo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha a entregar</th>
            <th scope="col">Estatus</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {tareas.map((row_tarea, index) => (
            <tr key={index}>
              <th>{dayjs(row_tarea.create_date).format('DD/MM/YYYY')}</th>
              <th>{row_tarea.titulo}</th>
              <th>{row_tarea.descripcion}</th>
              <th>{dayjs(row_tarea.fecha_a_entregar).format('DD/MM/YYYY')}</th>
              <th>{row_tarea.status}</th>
              <th>
                <div className="box-buttons">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteRow(row_tarea.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Button variant="primary" onClick={() => handleShow(row_tarea.id)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla