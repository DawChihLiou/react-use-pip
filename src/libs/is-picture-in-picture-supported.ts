import { ExtendedDocument, ExtendedHTMLVideoElement } from '../types'

/**
 * For safari^9.0 support
 */
export function isWebkitPictureInPictureSupported(
  video: ExtendedHTMLVideoElement
): boolean {
  return (
    (video as any).webkitSupportsPresentationMode &&
    typeof (video as any).webkitSetPresentationMode === 'function'
  )
}

export default function isPictureInPictureSupported(): boolean {
  return (document as ExtendedDocument).pictureInPictureEnabled
}
