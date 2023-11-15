import React from 'react'
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import DeleteTodo from "./pages/DeleteTodo"
import ShowTodo from "./pages/ShowTodo"
import CreateTodo from "./pages/CreateTodo"


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/todos/create' element={<CreateTodo />} />
      <Route path='/todos/details/:id' element={<ShowTodo />} />
      <Route path='/todos/delete/:id' element={<DeleteTodo />} />
    </Routes>
  )
}

export default App