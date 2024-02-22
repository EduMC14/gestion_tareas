import React, { useContext, useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import tareas from '../assets/tareas.png'
import { useNavigate } from 'react-router-dom'
import { RouterContext } from '../router'

function Login () {
  const contextLogin = useContext(RouterContext)

  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  function saveCredenciales (e) {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value })
  }

  async function login (e) {
    e.preventDefault()
    const request = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    })
    const response = await request.json()

    if (response.token) {
      // Funcion para desencriptar mi token
      const tokenDes = contextLogin.parseJwt(response.token)
      window.localStorage.setItem('token', response.token, 'loginUser', true)
      window.localStorage.setItem('userEmail', tokenDes.email)
      contextLogin.setActivedToken(true)
      contextLogin.setLoginUser(!contextLogin.userLogin)
      contextLogin.setEmailLogued(tokenDes.email)
      navigate('/tareasBitam')
    } else {
      console.log('No existe el token usuario erroneo')
    }
  }

  return (
    <div>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-3 border-primary' />
            <Card className='shadow'>
              <Card.Body>
                <div className='mb-3 mt-md-4'>
                  <div className='container box-title-img d-flex justify-content-around'>
                    <div>
                      <h2 className='fw-bold mb-2 text-uppercase '>
                        Gestion De Tareas Bitam
                      </h2>
                      <p className=''>
                        Por favor ingresa tu correo y contraseña!
                      </p>
                    </div>
                    <div>
                      <img src={tareas} alt='imagen de tareas' style={{ width: '100px' }} />
                    </div>
                  </div>
                  <div className='mb-3'>
                    <Form onSubmit={login}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>
                          Corre Electronico
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Ingrese Correo'
                          name='email'
                          onChange={saveCredenciales}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Contraseña'
                          name='password'
                          onChange={saveCredenciales}
                        />
                      </Form.Group>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      />
                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-3'>
                      <p className='mb-0  text-center'>
                        No tienes una cuenta?{' '}
                        <a href='/signUp' className='text-primary fw-bold'>
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
  )
}

export default Login
