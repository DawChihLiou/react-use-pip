import { ExtendedDocument } from '../types'

export default function isPictureInPictureSupported(): boolean {
  return (document as ExtendedDocument).pictureInPictureEnabled
}
