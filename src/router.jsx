import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import App from './App';

const Routers = () => {
return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/tareasBitam' element={<App />} />
    </Routes>
    </BrowserRouter>
)
}

export default Routers