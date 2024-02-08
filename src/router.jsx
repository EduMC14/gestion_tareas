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

const Routers = () => {
  const [loginUser, setLoginUser] = useState(() => {
    // Recupera el estado de autenticación desde el almacenamiento local al cargar la aplicación
    const storedLoginUser = localStorage.getItem('loginUser')
    console.log(storedLoginUser)
    return storedLoginUser ? JSON.parse(storedLoginUser) : false
  })
  const [activatedToken, setActivedToken] = useState(() => {
    const storedToken = localStorage.getItem('token')
    console.log(parseJwt(localStorage.getItem('token')))
    console.log(`${parseJwt(localStorage.getItem('token')).exp * 1000} > ${Date.now()} condicion`)
    if (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now()) {
      return true
    } else {
      localStorage.setItem('loginUser', false)
      return false
    }
  })

  useEffect(() => {
    // Almacena el estado de autenticación en el almacenamiento local cada vez que cambia
    localStorage.setItem('loginUser', JSON.stringify(loginUser))
  }, [loginUser])

  return (
    <BrowserRouter>
      <RouterContext.Provider value={{ loginUser, setLoginUser, activatedToken, setActivedToken }}>
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
