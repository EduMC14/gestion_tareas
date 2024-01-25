
import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';



function Login(){
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })
  

  const navigate = useNavigate()

  function signIn(e){
    e.preventDefault()

    navigate('/tareasBitam');
    console.log('hola desde el boton')
  }

  function saveCredenciales(e){
    setCredenciales({...credenciales,[e.target.name]: e.target.value})
  }

  async function login(e){
    e.preventDefault()
    const request = await fetch("http://localhost:3001/login", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    })

    const response = await request.json();
    console.log(
      response
    )

  }

  return (
    <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">Gestion De Tareas</h2>
                <p className=" mb-5">Por favor ingresa tu correo y contraseña!</p>
                <div className="mb-3">
                  <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Corre Electronico
                      </Form.Label>
                      <Form.Control type="email" placeholder="Ingrese Correo" name='email' onChange={saveCredenciales} />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Contraseña" name='password' onChange={saveCredenciales}/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" /* onClick={signIn} */>
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      No tienes una cuenta?{" "}
                      <a href="{''}" className="text-primary fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default Login;