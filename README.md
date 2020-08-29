[![react-use-pip](./banner.png)](https://github.com/DawChihLiou/react-use-pip)

[![NPM](https://img.shields.io/npm/v/react-use-pip.svg)](https://www.npmjs.com/package/react-use-pip) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# react-use-pip

> React hook for Picture in Picture

## Features

- Easy to use.
- Picture in picture browser support detection.
- TypeScript friendly. react-use-pip hook is written in TypeScript.
- Picture in Picture mode control with your own custom Event handlers.

## Install

```bash
npm install --save react-use-pip
```

```bash
yarn add react-us-pip
```

## Quick Start

```tsx
import usePictureInPicture from 'react-use-pip'

function VideoPlayer() {
  const {
    videoRef,
    isPictureInPictureActive,
    togglePictureInPicture,
  } = usePictureInPicture()

  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted controls loop width="100%">
        <source src="video-sample.mp4" />
      </video>
      <button onClick={() => togglePictureInPicture(!isPictureInPictureActive)}>
        {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in Picture
      </button>
    </div>
  )
}
```

## API

```ts
const {
  videoRef,
  isPictureInPictureActive,
  togglePictureInPicture,
} = usePictureInPicture(options)
```

### Parameters

- `options`: (optional) an `object` that provides the hook a set of callback functions.

### Return Values

- `videoRef`: Ref to pass in to video element as a prop
- `isPictureInPictureActive = false`: `boolean` that signals whether picture in picture mode is active or inactive
- `togglePictureInPicture(isActive: boolean) => void`: function that provide you toggle picture in picture mode

### Options

- `onEnterPictureInPicture(event: Event) => void`: (optional) callback function when entering picture in picture mode
- `onLeavePictureInPicture(event: Event) => void`: (optional) callback function when leaving picture in picture mode
- `onRequestPictureInPictureError(error: any) => void`: (optional) callback function when there is an error requesting picture in picture
- `onExitPictureInPictureError(error: any) => void`: (optional) callback function when there is an error exiting picture in picture

## License

MIT © [DawChihLiou](https://github.com/DawChihLiou)
