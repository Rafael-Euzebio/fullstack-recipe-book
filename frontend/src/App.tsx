import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { InfoPage } from './pages/InfoPage.tsx'
import { RecipesPage } from './pages/RecipesPage.tsx'
import { type Filter } from './types/filter.ts'

function App() {
  const [filter, setFilter] = useState<Filter>({
    type: '',
    value: '',
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipesPage filter={filter} />} />
        <Route path="/info/:id" element={<InfoPage setFilter={setFilter} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
