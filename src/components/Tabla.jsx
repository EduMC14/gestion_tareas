import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import ModalEdit from './ModalEdit';
import dayjs from 'dayjs';



const Tabla = ({tareas, refresh, stateRe}) => {

  const [idUpdate, setIdUpdate] = useState('');
  
  const [show, setShow] = useState(false);

  const [stateModal, setStateModal] = useState({
    titulo: '',
    descripcion: '',
    fecha_a_entregar: dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
    status: ''

  })

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setStateModal()
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
    refresh(!stateRe);
  }



  return (
    <div className="col-md-8" id="div_tabla">
      <ModalEdit id={idUpdate} show={show} close={handleClose} refresh={refresh} 
      stateRe={stateRe} 
      stateModal={stateModal}
      setStateModal={setStateModal}
      />
      
      <table className="table table-bordered text-white border-dark">
        <thead className='fs-6'>
          <tr className='text-center align-middle'>
            <th scope="col" className='col-1'><strong>Fecha de Creacion</strong></th>
            <th scope="col" className='col-2'><strong>Titulo</strong></th>
            <th scope="col" className='col-4'><strong>Descripcion</strong></th>
            <th scope="col" className='col-2'><strong>Fecha a entregar</strong></th>
            <th scope="col" className='col-1'><strong>Estatus</strong></th>
            <th scope="col" className='col-1'><strong>Acciones</strong></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {tareas.map((row_tarea, index) => (
          
            <tr className={row_tarea.status == 'Finalizada'? 'row-verde' : 
            row_tarea.status == 'Retrasada' ? 'row-rojo': 'row-azul'} 
            key={index}  id='row-header'>
              <th className='align-middle'>{dayjs(row_tarea.create_date).format('DD/MM/YYYY')}</th>
              <th className='text-break'  >{row_tarea.titulo}</th>
              <th className='text-break'  >{row_tarea.descripcion}</th>
              <th className='align-middle text-center'>{dayjs(row_tarea.fecha_a_entregar).format('DD/MM/YYYY')}</th>
              <th className={
                row_tarea.status == 'Finalizada'? 'text-success align-middle text-center'  : 
                row_tarea.status == 'Retrasada' ? 'text-danger align-middle text-center': 'text-primary align-middle align-middle text-center'
              }><strong>{row_tarea.status}</strong></th>
              <th  className='align-middle'>
                <div className="box-buttons">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteRow(row_tarea.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Button  className='btn-sm' onClick={() => {
                    handleShow(row_tarea.id)
                    setStateModal({...setStateModal, descripcion: row_tarea.descripcion,titulo: row_tarea.titulo, 
                      fecha_a_entregar: dayjs(row_tarea.fecha_a_entregar).format('YYYY-MM-DD'),
                      status: row_tarea.status
                    })
                    }}>
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