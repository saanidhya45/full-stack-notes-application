import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Routes, Route} from 'react-router-dom'


function App() {


  return (
         <div className='h-screen'>
          <Routes>
            <Route path='/' element = {<Homepage/>}/>
            <Route path='/signin' element = {<Signin/>}/>
            <Route path='/signup' element = {<Signup/>}/>
          </Routes>
          
         </div>
  )
}

export default App
