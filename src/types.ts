import { Dispatch, MutableRefObject, SetStateAction } from 'react'

export interface PictureInPictureWindow {
  readonly width: number
  readonly height: number
  onresize<K extends keyof GlobalEventHandlersEventMap>(
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ): void
}

export interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  requestPictureInPicture(): Promise<PictureInPictureWindow>

  onenterpictureinpicture<K extends keyof GlobalEventHandlersEventMap>(
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ): void

  onleavepictureinpicture<K extends keyof GlobalEventHandlersEventMap>(
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ): void

  autoPictureInPicture: boolean
  disablePictureInPicture: boolean
}

export interface ExtendedDocument
  extends Document,
    ExtendedDocumentOrShadowRoot {
  readonly pictureInPictureEnabled: boolean
  exitPictureInPicture(): Promise<void>
}

export interface ExtendedDocumentOrShadowRoot extends DocumentOrShadowRoot {
  readonly pictureInPictureElement: Element
}

export type VideoRefType = MutableRefObject<ExtendedHTMLVideoElement | null>

export interface usePictureInPictureOptions {
  onEnterPictureInPicture?: ExtendedHTMLVideoElement['onenterpictureinpicture']
  onLeavePictureInPicture?: ExtendedHTMLVideoElement['onleavepictureinpicture']
  onRequestPictureInPictureError?: (error: any) => void
  onExitPictureInPictureError?: (error: any) => void
}

export interface usePictureInPictureReturnType {
  videoRef: VideoRefType
  isPictureInPictureActive: boolean
  togglePictureInPicture: Dispatch<SetStateAction<boolean>>
}
