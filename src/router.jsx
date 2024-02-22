import React, { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import App from './App'
import SignUp from './pages/SignUp'
import { ProtectAuth } from './components/utils/ProtectAuth'

export const RouterContext = React.createContext()

function parseJwt (token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch (error) {
    return 'no hay token'
  }
}

const ls = window.localStorage

const Routers = () => {
  const [loginUser, setLoginUser] = useState(() => {
    // Recupera el estado de autenticación desde el almacenamiento local al cargar la aplicación
    const storedLoginUser = ls.getItem('loginUser')
    console.log(storedLoginUser)
    return storedLoginUser ? JSON.parse(storedLoginUser) : false
  })
  // Estado para saber si mi token a expirado o no
  const [activatedToken, setActivedToken] = useState(() => {
    const storedToken = ls.getItem('token')
    console.log(parseJwt(ls.getItem('token')))
    console.log(`${parseJwt(ls.getItem('token')).exp * 1000} > ${Date.now()} condicion`)
    if (parseJwt(storedToken).exp * 1000 > Date.now()) {
      return true
    } else {
      ls.setItem('loginUser', false)
      return false
    }
  })
  // Estado del email del usuario logueado
  const [emailLogued, setEmailLogued] = useState(() => {
    // Recupero el email, si hay un usuario logueado
    if (loginUser) {
      const desToken = parseJwt(ls.getItem('token'))
      window.localStorage.setItem('userEmail', desToken.email)
      return desToken.email
    } else {
      return 'No hay ningun usuario logueado'
    }
  })

  useEffect(() => {
    // Almacena el estado de autenticación en el almacenamiento local cada vez que cambia
    ls.setItem('loginUser', JSON.stringify(loginUser))
    if (loginUser === false) {
      window.localStorage.removeItem('userEmail')
      window.localStorage.removeItem('token')
      setEmailLogued(false)
    }
    console.log(emailLogued)
  }, [loginUser])

  return (
    <BrowserRouter>
      <RouterContext.Provider value={{
        loginUser,
        setLoginUser,
        activatedToken,
        setActivedToken,
        parseJwt,
        emailLogued,
        setEmailLogued
      }}
      >
        <Routes>
          <Route element={<ProtectAuth />}>
            <Route path='/tareasBitam' element={<App />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </RouterContext.Provider>
    </BrowserRouter>
  )
}

export default Routers
