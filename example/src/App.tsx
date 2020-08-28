import React from 'react'
import usePictureInPicture from 'react-use-pip'

const App = () => {
  const {
    videoRef,
    isPictureInPictureActive,
    togglePictureInPicture,
  } = usePictureInPicture({
    onEnterPictureInPicture: (e) => console.log('enter picture in picture', e),
    onLeavePictureInPicture: (e) => console.log('leave picture in picture', e),
  })

  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted controls loop width="100%">
        <source src="video-sample.mp4" />
      </video>
      <button onClick={() => togglePictureInPicture(!isPictureInPictureActive)}>
        {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in Picture
      </button>
    </div>
  )
}

export default App
