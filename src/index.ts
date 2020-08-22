import { useEffect, MutableRefObject } from 'react'

/**
 * usePictureInPicture should handle the following features
 * 1. detect PiP browser support
 * 2. detect PiP disabled
 * 3. request Picture-in-Picture
 * 4. exit Picture-in-Picture
 * 5. handle errors
 * 6. provide callback for "enterpictureinpicture" event
 * 7. provide callback for "leavepictureinpicture" event
 * 8. hanld
 * @param playerRef
 */
interface usePictureInPictureParams {
  isActive: boolean
  videoRef: MutableRefObject<any>
}
export function usePictureInPicture({
  isActive,
  videoRef,
}: usePictureInPictureParams): void {
  // TODO change "any" to HTMLVideoElement
  useEffect(() => {
    if (videoRef.current === null) {
      // log warning
      return
    }
    handlePictureInPicture(videoRef, isActive)
  }, [isActive, videoRef])
}

async function handlePictureInPicture(
  video: any,
  isActive: boolean
): Promise<void> {
  try {
    if (isActive) {
      await video.current.requestPictureInPicture()
    } else {
      await (document as any).exitPictureInPicture()
    }
  } catch (error) {
    // log error
  }
}
