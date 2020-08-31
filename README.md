[![react-use-pip](./banner.png)](https://github.com/DawChihLiou/react-use-pip)

[![NPM](https://img.shields.io/npm/v/react-use-pip.svg)](https://www.npmjs.com/package/react-use-pip)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Package size](https://badgen.net/bundlephobia/minzip/react-use-pip)](https://bundlephobia.com/result?p=react-use-pip)
[![License](https://badgen.net/npm/license/swr)](https://badgen.net/npm/license/react-use-pip)

# react-use-pip

React Hook for Picture in Picture.

Picture in Picture is a on going [W3C draft](https://w3c.github.io/picture-in-picture/) so that websites to create a floating window to continue playing media while users interact with other content or sites. Before shipping your application with the feature, please be aware that **the feature API is not widely supported yet across browsers** and the implementation status can be found [here](https://github.com/w3c/picture-in-picture/blob/master/implementation-status.md). Please also see [Can I Use](https://caniuse.com/#feat=picture-in-picture) for more information.

## Features

- Lightweight and easy to use.
- Picture in picture browser support detection.
- TypeScript friendly. react-use-pip hook is written in TypeScript.
- Picture in Picture mode control with your own custom Event handlers.

## Install

In your project directory, run

```bash
npm install --save react-use-pip
```

Or with Yarn

```bash
yarn add react-us-pip
```

## Quick Start

```tsx
import usePictureInPicture from 'react-use-pip'

function VideoPlayer() {
  const videoRef = useRef(null)
  const {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture,
  } = usePictureInPicture(videoRef)

  return (
    <div className="App">
      <video ref={videoRef} autoPlay muted controls loop width="100%">
        <source src="video-sample.mp4" />
      </video>
      {isPictureInPictureAvailable && (
        <button
          onClick={() => togglePictureInPicture(!isPictureInPictureActive)}
        >
          {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in Picture
        </button>
      )}
    </div>
  )
}
```

## API

```ts
const {
  isPictureInPictureActive,
  isPictureInPictureAvailable,
  togglePictureInPicture,
} = usePictureInPicture(videoRef, options)
```

### Parameters

- `videoRef`: Ref to pass in to video element as a prop
- `options`: (optional) an `object` that provides the hook a set of callback functions.

### Return Values

- `isPictureInPictureActive = false`: `boolean` that signals whether picture in picture mode is active or inactive
- `isPictureInPictureAvailable`: `boolean` that signals whether picture in picture mode is supported and enabled
- `togglePictureInPicture(isActive: boolean) => void`: function that provide you toggle picture in picture mode

### Options (Optional)

- `onEnterPictureInPicture(event: Event) => void`: (optional) callback function when entering picture in picture mode
- `onLeavePictureInPicture(event: Event) => void`: (optional) callback function when leaving picture in picture mode
- `onRequestPictureInPictureError(error: any) => void`: (optional) callback function when there is an error requesting picture in picture
- `onExitPictureInPictureError(error: any) => void`: (optional) callback function when there is an error exiting picture in picture

## License

MIT © [DawChihLiou](https://github.com/DawChihLiou)
