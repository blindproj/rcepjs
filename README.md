# rcep.js

> rcep.js core package.

## Install

npm (comming soon):
```sh
npm install --save rcep.js
```

browser:
```html
<script src="path_to_cepjs-core/dist/rcep.min.js"></script>
```

### CommonJS
```JavaScript
const coreFactory = require('rcepjs');
const { merge, fromEvent, tumblingTimeWindow, all, EventType } = coreFactory(require('rcepjs-rx'));

let clickStream = fromEvent(document, 'click',
    domEvent => new EventType('click event', 'DOM', Date.now()));

let keyPressStream = fromEvent(document, 'keypress',
    domEvent => new EventType('key press event', 'DOM', Date.now()));

let subscription =
      merge(clickStream, keyPressStream)
        .pipe(tumblingTimeWindow(1000),
          all(['click event', 'key press event'], 'click & press'))
        .subscribe({
          next: derivedEvent =>
            console.log(`Detected at ${new Date(derivedEvent.detectionTime)}`)
        });
```
### IIFE (browser)
```JavaScript
const { merge, fromEvent, tumblingTimeWindow, all, EventType } = rcepjs(rcepjsRx);

let clickStream = fromEvent(document, 'click',
    domEvent => new EventType('click event', 'DOM', Date.now()));

let keyPressStream = fromEvent(document, 'keypress',
    domEvent => new EventType('key press event', 'DOM', Date.now()));

let subscription =
      merge(clickStream, keyPressStream)
        .pipe(tumblingTimeWindow(1000),
          all(['click event', 'key press event'], 'click & press'))
        .subscribe({
          next: derivedEvent =>
            console.log(`Detected at ${new Date(derivedEvent.detectionTime)}`)
        });
```