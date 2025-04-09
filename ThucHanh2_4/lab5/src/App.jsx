import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lab_05 from './Lab_05'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Project, Theme, Analytics, Messages, Integrations } from './Lab_05'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Lab_05 />}>
            <Route path="dashboard"
              element={<Dashboard />} />
            <Route path="project"
              element={<Project />} />
            <Route path="theme"
              element={<Theme />} />
            <Route path="analytics"
              element={<Analytics />} />
            <Route path="messages"
              element={<Messages />} />
            <Route path="integrations"
              element={<Integrations />} />
          </Route>
        </Routes>
      </Router >

    </>
  )
}

export default App
