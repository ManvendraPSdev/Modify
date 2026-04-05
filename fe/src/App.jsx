import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FaceDetector from './features/Expression/components/FaceDetector'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
     <FaceDetector/>
    </>
  )
}

export default App
