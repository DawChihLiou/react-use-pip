import { useEffect, useRef, useState } from 'react'
import isPictureInPictureDisabled from './libs/is-picture-in-picture-disabled'
import isPictureInPictureSupported from './libs/is-picture-in-picture-supported'
import {
  ExtendedDocument,
  ExtendedHTMLVideoElement,
  usePictureInPictureParams,
  usePictureInPictureReturnType,
  VideoRefType,
} from './types'

export default function usePictureInPicture(
  config?: usePictureInPictureParams
): usePictureInPictureReturnType {
  const videoRef = useRef<ExtendedHTMLVideoElement>(null)
  const [isPictureInPictureActive, togglePictureInPicture] = useState<boolean>(
    false
  )

  const {
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onRequestPictureInPictureError,
    onExitPictureInPictureError,
  } = config || {}

  useEffect(() => {
    handlePictureInPicture(
      videoRef,
      isPictureInPictureActive,
      onRequestPictureInPictureError,
      onExitPictureInPictureError
    )
  }, [
    videoRef,
    isPictureInPictureActive,
    onRequestPictureInPictureError,
    onExitPictureInPictureError,
  ])

  useEffect(() => {
    if (videoRef.current === null) {
      return
    }
    if (
      onEnterPictureInPicture &&
      typeof onEnterPictureInPicture === 'function'
    ) {
      videoRef.current.addEventListener(
        'enterpictureinpicture',
        onEnterPictureInPicture
      )
    }
    if (
      onLeavePictureInPicture &&
      typeof onLeavePictureInPicture === 'function'
    ) {
      videoRef.current.addEventListener(
        'leavepictureinpicture',
        onLeavePictureInPicture
      )
    }

    return () => {
      if (videoRef.current === null) {
        return
      }
      if (
        onEnterPictureInPicture &&
        typeof onEnterPictureInPicture === 'function'
      ) {
        videoRef.current.removeEventListener(
          'enterpictureinpicture',
          onEnterPictureInPicture
        )
      }
      if (
        onLeavePictureInPicture &&
        typeof onLeavePictureInPicture === 'function'
      ) {
        videoRef.current.removeEventListener(
          'leavepictureinpicture',
          onLeavePictureInPicture
        )
      }
    }
  }, [])

  return { videoRef, isPictureInPictureActive, togglePictureInPicture }
}

async function handlePictureInPicture(
  video: VideoRefType,
  isActive: boolean,
  onRequestPictureInPictureError: usePictureInPictureParams['onRequestPictureInPictureError'],
  onExitPictureInPictureError: usePictureInPictureParams['onExitPictureInPictureError']
): Promise<void> {
  if (video.current === null) {
    throw new Error(
      'vieoRef is not referencing to a video element. Please pass the videoRef as ref in a video element.'
    )
  }
  if (video.current.nodeName.toLocaleLowerCase() !== 'video') {
    throw new Error(
      `videoRef is currently referencing to a ${video.current.nodeName} element. Plese pass it as ref in a video element.`
    )
  }

  if (!isPictureInPictureSupported()) {
    console.error('Picture in picture is not supported in your browser.')
  }
  if (isPictureInPictureDisabled(video.current)) {
    console.error(
      'Picture in picture is disabled in your browser. If you want to activate the feature, please enable it in the browser settings.'
    )
  }

  if (isActive) {
    try {
      await video.current.requestPictureInPicture()
    } catch (error) {
      if (
        onRequestPictureInPictureError &&
        typeof onRequestPictureInPictureError === 'function'
      ) {
        onRequestPictureInPictureError(error)
      }
      console.error('Video failed to enter Picture-in-Picture mode.')
    }
  }
  if (!isActive && (document as ExtendedDocument).pictureInPictureElement) {
    try {
      await (document as ExtendedDocument).exitPictureInPicture()
    } catch (error) {
      if (
        onExitPictureInPictureError &&
        typeof onExitPictureInPictureError === 'function'
      ) {
        onExitPictureInPictureError(error)
      }
      console.error('Video failed to leave Picture-in-Picture mode.')
    }
  }
}
