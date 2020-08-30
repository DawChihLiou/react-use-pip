import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import usePictureInPicture from 'react-use-pip'
import CodeBlock from './CodeBlock'
import { VscGithub } from 'react-icons/vsc'
import './app.css'
import { ExtendedHTMLVideoElement } from '../../dist/types'

async function fetchMarkdown(
  saveMarkdown: Dispatch<SetStateAction<string | undefined>>
): Promise<void> {
  const response = await fetch(`${process.env.PUBLIC_URL}/DOC.md`)
  const text = await response.text()
  saveMarkdown(text)
}

const App = () => {
  const videoRef = useRef<ExtendedHTMLVideoElement | null>(null)
  const {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture,
  } = usePictureInPicture(videoRef, {
    onEnterPictureInPicture: (e) => console.log('enter picture in picture', e),
    onLeavePictureInPicture: (e) => console.log('leave picture in picture', e),
  })
  const handleClick = () => togglePictureInPicture(!isPictureInPictureActive)
  const [markdown, setMarkdown] = useState<string>()

  useEffect(() => {
    fetchMarkdown(setMarkdown)
  }, [])

  return (
    <>
      <nav className="nav">
        <a href="/">
          <img
            className="logo"
            src={`${process.env.PUBLIC_URL}/logo-light-64x64.png`}
            alt="react-use-pip-logo"
          />
        </a>
        <a href="/" className="title">
          <h3>react-use-pip</h3>
        </a>
        <a href="https://github.com/DawChihLiou/react-use-pip">
          <VscGithub size={24} />
        </a>
      </nav>
      <div className="app">
        <video ref={videoRef} autoPlay muted controls loop width="100%">
          <source src="video-sample.mp4" />
        </video>
        <div className="action-row">
          {isPictureInPictureAvailable && (
            <button onClick={handleClick} className="control-button">
              {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in
              Picture
            </button>
          )}
          {!isPictureInPictureAvailable && (
            <p>
              Picture in Picture feature API is not available in your browser.
            </p>
          )}
        </div>
        <ReactMarkdown source={markdown} renderers={{ code: CodeBlock }} />
      </div>
    </>
  )
}

export default App
