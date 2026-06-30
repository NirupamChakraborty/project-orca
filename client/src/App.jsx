import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Authentication from './pages/Authentication'
import VideoMeetComponent from './pages/VideoMeet'

const App = () => {
  return (
    <div>

      
        <Router>
        <Toaster position="top-center" reverseOrder={true}/>
          <AuthProvider >
            <Routes>
                  <Route path='/' element={<LandingPage />} />

                   <Route path='/auth' element={<Authentication />} />

                    <Route path='/home's element={<HomeComponent />} />
                    <Route path='/history' element={<History />} />
                      <Route path='/:url' element={<VideoMeetComponent />} />
            </Routes>
            </AuthProvider>
        </Router>
    </div>
  )
}

export default App