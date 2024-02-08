import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
  from 'mdb-react-ui-kit'

const SignUp = () => {

  const [userRegister, setUserregister] = useState({
    username: '',
    email: '',
    password:''
  })

  function saveUser(e){
    setUserregister({...userRegister, [e.target.name]: e.target.value})
  }

  async function sendRegister(e) {
    e.preventDefault()
    try {
      const request = await fetch('http://localhost:3001/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRegister)
    })
    const response = await request.json()
    console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Inscribite</p>

              <div className='d-flex flex-row  mb-4 '>
                <MDBIcon fas icon='user me-3' size='lg' className='mt-3' />
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' name='username' onChange={saveUser} />
              </div>

              <div className='d-flex flex-row mb-4'>
                <MDBIcon fas icon='envelope me-3' size='lg' className='mt-3' />
                <MDBInput label='Your Email' id='form2' type='email' name='email' onChange={saveUser} />
              </div>

              <div className='d-flex flex-row mb-4'>
                <MDBIcon fas icon='lock me-3' size='lg' className='mt-3' />
                <MDBInput label='Password' id='form3' type='password' name='password' onChange={saveUser} />
              </div>

              <div className='d-flex flex-row  mb-4'>
                <MDBIcon fas icon='key me-3' size='lg' className='mt-3' />
                <MDBInput label='Repeat your password' id='form4' type='password' />
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={sendRegister}>Registrate</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  )
}

export default SignUp;
