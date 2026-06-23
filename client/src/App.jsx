import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Landing from './pages/Landing'

const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Authentication />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App