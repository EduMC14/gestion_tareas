import React, { useContext } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { RouterContext } from '../../router'


export const ProtectAuth = ({ redirectPath = '/login' }) => {
  const authContext = useContext(RouterContext)
  console.log(authContext.loginUser)
  console.log(authContext.activatedToken)

  if (authContext.loginUser && authContext.activatedToken) {
    return <Outlet />
  } else {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to={redirectPath} replace />
  }
}
