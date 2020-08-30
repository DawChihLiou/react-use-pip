import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'
import usePictureInPicture from './index'
import { ExtendedHTMLVideoElement } from './types'

describe('usePictureInPicture', () => {
  beforeEach(cleanup)

  it('should return default picture in picture mode: false.', () => {
    const ref = createRef<ExtendedHTMLVideoElement | null>()
    const { result } = renderHook(() => usePictureInPicture(ref))
    expect(result.current.isPictureInPictureActive).toBeFalsy()
  })

  it('should toggle default picture in picture mode to true.', () => {
    const ref = createRef<ExtendedHTMLVideoElement | null>()
    const { result } = renderHook(() => usePictureInPicture(ref))
    expect(result.current.isPictureInPictureActive).toBeFalsy()

    act(() => {
      result.current.togglePictureInPicture(true)
    })
    expect(result.current.isPictureInPictureActive).toBeTruthy()
  })
})
