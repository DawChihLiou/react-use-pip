import { useEffect, useState } from 'react'
import isPictureInPictureDisabled from './libs/is-picture-in-picture-disabled'
import isPictureInPictureSupported, {
  isWebkitPictureInPictureSupported,
} from './libs/is-picture-in-picture-supported'
import {
  ExtendedDocument,
  ExtendedHTMLVideoElement,
  usePictureInPictureOptions,
  usePictureInPictureReturnType,
  VideoRefType,
} from './types'

export default function usePictureInPicture(
  videoRef: VideoRefType,
  options?: usePictureInPictureOptions
): usePictureInPictureReturnType {
  const {
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onRequestPictureInPictureError,
    onExitPictureInPictureError,
  } = options || {}

  const [isPictureInPictureActive, togglePictureInPicture] = useState<boolean>(
    false
  )

  const [
    isPictureInPictureAvailable,
    setIsPictureInPictureAvailable,
  ] = useState<boolean>(false)

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
    checkAvailability(videoRef.current)

    if (videoRef.current === null) {
      return
    }
    setIsPictureInPictureAvailable(
      (isWebkitPictureInPictureSupported(videoRef.current) ||
        isPictureInPictureSupported()) &&
        !isPictureInPictureDisabled(videoRef.current)
    )

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

  return {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture,
  }
}

function checkAvailability(video: ExtendedHTMLVideoElement | null) {
  /**
   * As of now, picutre in picture is only available for "video" element.
   */
  if (video === null) {
    console.warn(
      'vieoRef is not referencing to an element. Please pass the videoRef as ref in a video element.'
    )
  }
  if (video && video.nodeName.toLocaleLowerCase() !== 'video') {
    console.warn(
      `videoRef is currently referencing to a ${video.nodeName} element. Plese pass it as ref in a video element.`
    )
  }
  /**
   * Safari^9.0 has a none-standard pip api. "isWebkitPictureInPictureSupported" is to support Safari.
   */
  if (
    video &&
    !isPictureInPictureSupported() &&
    !isWebkitPictureInPictureSupported(video)
  ) {
    console.warn('Picture in picture is not supported in your browser.')
  }
  if (video && isPictureInPictureDisabled(video)) {
    console.warn(
      'Picture in picture is disabled in your browser. If you want to activate the feature, please enable it in the browser settings.'
    )
  }
  if (video && isWebkitPictureInPictureSupported(video)) {
    console.warn(
      'Your browser supports a none-standard Picture in picture API.'
    )
  }
}

async function handlePictureInPicture(
  video: VideoRefType,
  isActive: boolean,
  onRequestPictureInPictureError: usePictureInPictureOptions['onRequestPictureInPictureError'],
  onExitPictureInPictureError: usePictureInPictureOptions['onExitPictureInPictureError']
): Promise<void> {
  if (video.current === null) {
    return
  }
  if (isActive) {
    try {
      if (isWebkitPictureInPictureSupported(video.current)) {
        // Safari^9.0 support
        ;(video.current as any).webkitSetPresentationMode('picture-in-picture')
      } else {
        await video.current.requestPictureInPicture()
      }
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
      if (isWebkitPictureInPictureSupported(video.current)) {
        // Safari^9.0 support
        ;(video.current as any).webkitSetPresentationMode('inline')
      } else {
        await (document as ExtendedDocument).exitPictureInPicture()
      }
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
