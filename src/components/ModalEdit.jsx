import React, { useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Datetime from './Datetime';



const ModalEdit = ({ id, show, close }) => {

  const [stateModal, setStateModal] = useState({
    titulo: '',
    descripcion: '',
    fecha_a_entregar: dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
    status: ''

  })

  // Funcion para guardar en el estado el status
    function saveSelectState(e){
       setStateModal({...stateModal,['status']: e.target.value})
    }


  // Funcion para guarda el estado en el evento Onchange
    function saveFormModal(event) {
      setStateModal({ ...stateModal, [event.target.name]: event.target.value });
    }


// Funcion para guardar el formulario en la base de datos
    function updateRegister(e){
        console.log(e)
        axios.put(`http://localhost:3001/updateRegister/${id}`,stateModal).then((res) => {
            console.log(res.data);
        });
    }


  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Actualiza tu tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="Titulo Nuevo" autoFocus name='titulo' onChange={saveFormModal} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name='descripcion' onChange={saveFormModal}/>
            </Form.Group>
            <Form.Group>
              <Datetime date={stateModal} save={setStateModal} />
            </Form.Group>
            <Form.Group>
            <Form.Label className='mt-2'>Estatus</Form.Label>
              <Form.Select aria-label="Default select example" onChange={saveSelectState}>
                <option value='' >Selecciona un Estatus</option>
                <option value="Finalizada">Finalizada</option>
                <option value="En proceso">En proceso</option>
                <option value="Terminada">Terminada</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="success" onClick={() => {
            updateRegister();
            close();
          }}>Actualizar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit