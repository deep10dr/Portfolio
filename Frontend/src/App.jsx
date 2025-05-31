import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './assets/pages/Home';
import NotFound from './assets/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}  />
       <Route  path='*' element={<NotFound/>}   />
    </Routes>
    </BrowserRouter>
  )
}

export default App