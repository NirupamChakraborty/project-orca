import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Authentication from './pages/Authentication'
import Landing from './pages/Landing'

const App = () => {
  return (
    <div>
        <Router>
        <Toaster position="top-center" reverseOrder={true}/>
          <AuthProvider >
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Authentication />} />
            </Routes>
            </AuthProvider>
        </Router>
    </div>
  )
}

export default App