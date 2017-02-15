# react-flexifit-ts
A React component to make non-responsive elements, (such as iframes, canvas, etc) or components responsive with full TypeScript definitions.

Based off of https://github.com/LeisureLink-FE/react-flexifit, which was inspired by fitvids.

## Installation

Install via [Yarn](https://yarnpkg.com):

```bash
yarn add react-flexifit-ts
```

Or via [NPM](https://npmjs.com/package/react-flexifit-ts):

```bash
npm i react-flexifit-ts --save
```

## Importing

Import this package via ES6's default import:

```js
import Flexifit from "react-flexifit-ts";
```

Or import it via Node's require:

```js
const Flexifit = require("react-flexifit-ts").default;
```

## Usage

### aspectRatio
```js
<Flexifit aspectRatio={1.5} >
  <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w"/>
</Flexifit>
```

Flexifit will ensure it's child element maintains the specified aspectRatio no matter the screen size.

### height/width
```js
<Flexifit height={200} width={250} >
  <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w"/>
</Flexifit>
```

Flexifit will calculate the appropriate aspect ratio and maintain that calculated aspectRatio.

### throttle
```js
<Flexifit aspectRation={1.5} throttle={500}>
  <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w"/>
</Flexifit>
```

Throttle controls how often (in milliseconds) Flexifit reflows the child element during window resize. Defaults to `100` milliseconds.

## Considerations

* Flexifit will throw if anything other than one child is provided.
* If `aspectRatio` and `height`/`width` are provided, `aspectRatio` will win.