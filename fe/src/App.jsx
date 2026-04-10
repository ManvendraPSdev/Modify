import { useState } from 'react'
import AppRoutes from './app.routes'
import FaceDetector from './features/Expression/components/FaceDetector'
import "./features/shared/style/global.scss"
import { AuthProvider } from './features/Auth/auth.context'
import { SongContextProvider } from './features/home/song.context'

function App() {

  return(
    <>
    <AuthProvider>
      <SongContextProvider>
        <AppRoutes/>
      </SongContextProvider>
    </AuthProvider>
    </>
  )
}

export default App
