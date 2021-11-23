import { createContext, useState, useEffect } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { isRegularExpressionLiteral } from 'typescript'
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom'

import {Home} from './pages/Home'
import {NewRoom} from './pages/NewRoom'
import { Room } from './pages/Room'
import { auth,firebase } from './services/firebase'


function App() {
  
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/rooms/new'element={<NewRoom/>}/>
      <Route path='/rooms/:id'element= {<Room/>}/>
      <Route path='/admin/rooms/:id'element= {<AdminRoom/>}/>

    </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    );
}

export default App;
