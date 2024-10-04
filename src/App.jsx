import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Form from "./components/Form"
import ViewRecord from './components/ViewRecord'
import EditRecord from './components/EditRecord'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/css/style.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/view" element={<ViewRecord />} />
        <Route path="/edit/:id" element={<EditRecord />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
