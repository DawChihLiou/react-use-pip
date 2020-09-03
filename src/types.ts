import { Dispatch, MutableRefObject, SetStateAction } from 'react'

/**
 * Browswer API support. Picture in Picture API is not yet supported in TypeScript.
 * First Public Working Draft: https://www.w3.org/TR/picture-in-picture/
 */

/**
 * Reference:
 * https://www.w3.org/TR/picture-in-picture/#interface-picture-in-picture-window
 */
interface PictureInPictureWindow extends EventTarget {
  readonly width: number
  readonly height: number
  onresize: ((this: HTMLVideoElement, ev: Event) => any) | null
}
/**
 * Reference:
 * https://www.w3.org/TR/picture-in-picture/#htmlvideoelement-extensions
 */
export interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  autoPictureInPicture: boolean
  disablePictureInPicture: boolean
  requestPictureInPicture(): Promise<PictureInPictureWindow>
  onenterpictureinpicture:
    | ((this: HTMLVideoElement, ev: EnterPictureInPictureEvent) => any)
    | null
  onleavepictureinpicture: ((this: HTMLVideoElement, ev: Event) => any) | null

  addEventListener<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
}
interface HTMLVideoElementEventMap extends HTMLElementEventMap {
  enterpictureinpicture: EnterPictureInPictureEvent
  leavepictureinpicture: Event
}
/**
 * Reference:
 * https://www.w3.org/TR/picture-in-picture/#document-extensions
 */
export interface ExtendedDocument
  extends Document,
    ExtendedDocumentOrShadowRoot {
  readonly pictureInPictureEnabled: boolean
  exitPictureInPicture(): Promise<void>
}

declare var ExtendedDocument: {
  prototype: ExtendedDocument
  new (): ExtendedDocument
}
/**
 * Reference:
 * https://www.w3.org/TR/picture-in-picture/#documentorshadowroot-extension
 */
interface ExtendedDocumentOrShadowRoot extends DocumentOrShadowRoot {
  readonly pictureInPictureElement?: Element
}
/**
 * Reference:
 * https://www.w3.org/TR/picture-in-picture/#event-types
 */
interface EnterPictureInPictureEventInit extends EventInit {
  pictureInPictureWindow: PictureInPictureWindow
}

export interface EnterPictureInPictureEvent extends Event {
  readonly pictureInPictureWindow: PictureInPictureWindow
}

declare var EnterPictureInPictureEvent: {
  prototype: EnterPictureInPictureEvent
  new (
    type: string,
    eventInitDict: EnterPictureInPictureEventInit
  ): EnterPictureInPictureEvent
}

/**
 * react-use-pip API
 */
export type VideoRefType = MutableRefObject<ExtendedHTMLVideoElement | null>

export interface usePictureInPictureOptions {
  onEnterPictureInPicture?: ExtendedHTMLVideoElement['onenterpictureinpicture']
  onLeavePictureInPicture?: ExtendedHTMLVideoElement['onleavepictureinpicture']
  onRequestPictureInPictureError?: (error: any) => void
  onExitPictureInPictureError?: (error: any) => void
}

export interface usePictureInPictureReturnType {
  isPictureInPictureActive: boolean
  isPictureInPictureAvailable: boolean
  togglePictureInPicture: Dispatch<SetStateAction<boolean>>
}
