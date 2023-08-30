import Main from '@/components/pages/Main'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { RouterPath } from '@/models/Enums'
import React from 'react'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path={RouterPath.base}
          element={<Main/>}
        />
      </Routes>
    </HashRouter>
  )
}

export default App
