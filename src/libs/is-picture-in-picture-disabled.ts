import { ExtendedHTMLVideoElement } from '../types'

export default function isPictureInPictureDisabled(
  video: ExtendedHTMLVideoElement
): boolean {
  return video.disablePictureInPicture
}
