import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { InfoPage } from './pages/InfoPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info/:id" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
