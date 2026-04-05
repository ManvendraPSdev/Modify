import { useState } from 'react'
import AppRoutes from './app.routes'
import FaceDetector from './features/Expression/components/FaceDetector'
import "./features/shared/style/global.scss"
import { AuthProvider } from './features/Auth/auth.context'

function App() {

  return(
    <>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
    </>
  )
}

export default App
