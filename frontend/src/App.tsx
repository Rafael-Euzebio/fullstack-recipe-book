import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { InfoPage } from './pages/InfoPage.tsx'
import { RecipesPage } from './pages/RecipesPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/info/:id" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
