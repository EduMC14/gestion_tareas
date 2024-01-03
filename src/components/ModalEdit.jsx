import React, { useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
// Componentes de React Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Datetime from './Datetime';
import { ToastContainer, toast } from 'react-toastify';



const ModalEdit = ({ id, show, close, refresh, stateRe, stateModal, setStateModal }) => {


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
        axios.put(`http://localhost:3001/updateRegister/${id}`,stateModal).then((res) => {
            console.log(res.data);
            if(res.status === 200){
              toast.info('🦄 Tarea Actulizada!', {
                position: "top-right",
                /* autoClose: 2000, */
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                refresh(!stateRe);
            } else{
              toast.warn('🦄 Upss, Hubo un error al actulizar', {
                position: "top-right",
                /* autoClose: 2000, */
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
        }).catch((Error) => {
          toast.warn('🦄 Upss, Hubo un error al actulizar', {
            position: "top-right",
           /*  autoClose: 2000, */
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            console.log(Error);
        });
    }


  return (
    <>
    <ToastContainer autoClose={1500} />
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Actualiza tu tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="Titulo Nuevo" autoFocus name='titulo' onChange={saveFormModal}
              value={stateModal.titulo} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name='descripcion' onChange={saveFormModal} 
              value={stateModal.descripcion}/>
            </Form.Group>
            <Form.Group>
              <Datetime state={stateModal} save={setStateModal} property={'fecha_a_entregar'} />
            </Form.Group>
            <Form.Group>
            <Form.Label className='mt-2'>Estatus</Form.Label>
              <Form.Select aria-label="Default select example" onChange={saveSelectState}>
                <option value='' >Selecciona un Estatus</option>
                <option value="Finalizada">Finalizada</option>
                <option value="En proceso">En proceso</option>
                <option value="Retrasada">Retrasada</option>
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