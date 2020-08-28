import React, { useState } from 'react'
import { usePictureInPicture } from 'react-use-pip'

const Test = () => {
  const [isActive] = useState(false)
  const videoRef = usePictureInPicture({ isActive })

  return <div ref={videoRef}>Test component</div>
}

export default Test
