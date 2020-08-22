import React, { useState, useRef } from 'react'
import './App.css'
import { usePictureInPicture } from 'react-use-pip'

function App() {
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<any>(null)

  usePictureInPicture({ isActive, videoRef })

  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted controls>
        <source src="https://cdn.arnellebalane.com/videos/original-video.mp4" />
      </video>
      <button onClick={() => setIsActive(!isActive)}>CLICK ME!</button>
    </div>
  )
}

export default App
