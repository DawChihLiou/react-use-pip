import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import usePictureInPicture from 'react-use-pip'
import CodeBlock from './CodeBlock'
import './app.css'

async function fetchMarkdown(
  saveMarkdown: Dispatch<SetStateAction<string | undefined>>
): Promise<void> {
  const response = await fetch(`${process.env.PUBLIC_URL}/DOC.md`)
  const text = await response.text()
  saveMarkdown(text)
}

const App = () => {
  const {
    videoRef,
    isPictureInPictureActive,
    togglePictureInPicture,
  } = usePictureInPicture({
    onEnterPictureInPicture: (e) => console.log('enter picture in picture', e),
    onLeavePictureInPicture: (e) => console.log('leave picture in picture', e),
  })

  const handleClick = () => togglePictureInPicture(!isPictureInPictureActive)

  const [markdown, setMarkdown] = useState<string>()
  useEffect(() => {
    fetchMarkdown(setMarkdown)
  }, [])

  return (
    <div className="app">
      <a href="https://github.com/DawChihLiou/react-use-pip">
        <img
          className="banner"
          src={`${process.env.PUBLIC_URL}/banner.png`}
          alt="rect-use-pip"
        />
      </a>
      <video ref={videoRef} autoPlay muted controls loop width="100%">
        <source src="video-sample.mp4" />
      </video>
      <div className="action-row">
        <button onClick={handleClick} className="control-button">
          {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in Picture
        </button>
      </div>
      <ReactMarkdown source={markdown} renderers={{ code: CodeBlock }} />
    </div>
  )
}

export default App
