import { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";


import axios from 'axios';
import Datetime from './Datetime';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { appContext } from "../App";



function Example({ stateShow, setShow }) {
  
  const appContexto = useContext(appContext)
  

  const [formTask, setFormTask] = useState({
    fecha_de_inicio: dayjs().format('YYYY-MM-DD'),
    titulo: '',
    descripcion: '',
    fecha_a_entregar: dayjs().format('YYYY-MM-DD'),
    status: ''
  })
  const [checkboxes, setCheckboxes] = useState({
    Finalizada: false,
    En_proceso: false,
    Retrasada: false
  });

  function saveFormState(event) {
    setFormTask({ ...formTask, [event.target.name]: event.target.value });
  }

  function handleCheckboxChange(event) {
    const { name, value, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: !checkboxes[name]
    });
    if(checked){
      setFormTask({...formTask, ['status']: value})
    }else{
      setFormTask({...formTask, ['status']: ''})
    }
      
  }

  const submitForm = (e) => {
    e.preventDefault()
    toast.promise(
      axios.post("http://localhost:3001/saveTask", formTask),
      {
        pending: 'Guardando...',
        success: 'Tarea Guardada 👌',
        error: 'Upss, Hubo un error al guardar🤯'
      }
    )
      .then((res) => {
        setFormTask({ ...formTask, status: '', titulo: '', descripcion: '' });
        if (res.status === 200) {
          appContexto.getFechas();
          appContexto.fetchTareas(appContexto.fecha);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={stateShow} onHide={handleClose}  >
        <Offcanvas.Header closeButton className="box_canvas_header">
        <h4>Agregar Tarea</h4> 
        </Offcanvas.Header>
        
        <div className="div_form">
      <div>
      </div>
      <form className='formulario' onSubmit={submitForm}>
        <h5>Fecha de Inicio</h5>
        <Datetime state={formTask} save={setFormTask} property="fecha_de_inicio"/>
        <h5>Titulo</h5>
        <input
          id="input_title"
          className="form-control titulo"
          type="text"
          placeholder="Agregar Titulo"
          aria-label="default input example"
          onChange={saveFormState}
          name='titulo'
          value={formTask.titulo}
          required
        />
        <h5 className="mt-3">Descripcion</h5>
        <textarea
          id='input_descripcion'
          cols="30"
          rows="10"
          className="form-control text_tarea descripcion"
          placeholder="Escribe tu Descripcion"
          onChange={saveFormState}
          name='descripcion'
          value={formTask.descripcion}
          required
        ></textarea>
        <h5>Entregable</h5>
        <Datetime state={formTask} save={setFormTask} property="fecha_a_entregar"/>
        <div className="form-check mt-3 p-0">
          <h5>Status de tu tarea</h5>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                name='Finalizada'
                value="Finalizada"
                onChange={handleCheckboxChange}
                checked={checkboxes.Finalizada}
                disabled={checkboxes.En_proceso || checkboxes.Retrasada }
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Finalizada
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox2"
                name='En_proceso'
                value='En proceso'
                onChange={handleCheckboxChange}
                checked={checkboxes.En_proceso}
                disabled={checkboxes.Finalizada || checkboxes.Retrasada }
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                En proceso
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox3"
                name='Retrasada'
                value='Retrasada'
                onChange={handleCheckboxChange}
                checked={checkboxes.Retrasada}
                disabled={checkboxes.En_proceso || checkboxes.Finalizada }
              />
              <label className="form-check-label" htmlFor="inlineCheckbox3">
                Retrasada
              </label>
            </div>
          </div>
          <div className="d-grid gap-2">
              <button className="btn btn-success mt-2" type="submit" name='create task'>Guardar</button>
              
          </div>
        </div>
      </form>
    </div>
      </Offcanvas>
    </>
  );
}

export default Example;
