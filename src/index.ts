import { useEffect, useState } from 'react'
import isPictureInPictureDisabled from './libs/is-picture-in-picture-disabled'
import isPictureInPictureSupported, {
  isWebkitPictureInPictureSupported,
} from './libs/is-picture-in-picture-supported'
import {
  ExtendedDocument,
  usePictureInPictureOptions,
  usePictureInPictureReturnType,
  VideoRefType,
} from './types'

export default function usePictureInPicture(
  videoRef: VideoRefType,
  options?: usePictureInPictureOptions
): usePictureInPictureReturnType {
  const [isPictureInPictureActive, togglePictureInPicture] = useState<boolean>(
    false
  )

  const {
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onRequestPictureInPictureError,
    onExitPictureInPictureError,
  } = options || {}

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

  return { isPictureInPictureActive, togglePictureInPicture }
}

async function handlePictureInPicture(
  video: VideoRefType,
  isActive: boolean,
  onRequestPictureInPictureError: usePictureInPictureOptions['onRequestPictureInPictureError'],
  onExitPictureInPictureError: usePictureInPictureOptions['onExitPictureInPictureError']
): Promise<void> {
  if (video.current === null) {
    console.warn(
      'vieoRef is not referencing to an element. Please pass the videoRef as ref in a video element.'
    )
    return
  }
  if (video.current.nodeName.toLocaleLowerCase() !== 'video') {
    console.warn(
      `videoRef is currently referencing to a ${video.current.nodeName} element. Plese pass it as ref in a video element.`
    )
    return
  }
  /**
   * Safari^9.0 has a different pip api. "isWebkitPictureInPictureSupported" is to support Safari.
   */
  if (
    !isPictureInPictureSupported() &&
    !isWebkitPictureInPictureSupported(video.current)
  ) {
    console.warn('Picture in picture is not supported in your browser.')
  }

  if (isPictureInPictureDisabled(video.current)) {
    console.warn(
      'Picture in picture is disabled in your browser. If you want to activate the feature, please enable it in the browser settings.'
    )
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
