Squarespace Fonts Loaded
--------------------

A promise-based class used to determine if fonts have loaded for particular HTMLElements.

*NOTICE: This code is licensed to you pursuant to Squarespace’s Developer Terms of Use. See license section below.*

## Usage

````sh
npm install --save @squarespace/fonts-loaded
````

````js
const fontsLoadedInstance = new fontsLoaded([HTMLElement, HTMLElement]);
fontsLoadedInstance.check().then(...)

````

### Using ES6

If you prefer to handle transpiling and polyfilling on your own, you can import ES6 from Fonts Loaded:

```js
import FontsLoaded from '@squarespace/fonts-loaded/src';
```

Alternately, Fonts Loaded specifies a `module` property in `package.json` that points to the uncompiled `src/index.js`, so you may be able to simply import `@squarespace/fonts-loaded` if you're using one of the following bundlers:
* [Webpack 2](https://webpack.js.org/configuration/resolve/#resolve-mainfields)
* [Rollup](https://github.com/rollup/rollup-plugin-node-resolve#rollup-plugin-node-resolve)

## Reference

### new fontsLoaded(testArray)
**Params**
* testArray `Array` - An array of HTMLElements. The font-family of these elements will be tested to determine if the font has loaded.

### fontsLoaded.check()
Begins to check if the fonts have loaded and returns a promise.

### fontsLoaded.destroy()
Clears timers and removes test elements.

## License
Portions Copyright © 2016 Squarespace, Inc. This code is licensed to you pursuant to Squarespace’s Developer Terms of Use, available at http://developers.squarespace.com/developer-terms-of-use (the “Developer Terms”). You may only use this code on websites hosted by Squarespace, and in compliance with the Developer Terms. TO THE FULLEST EXTENT PERMITTED BY LAW, SQUARESPACE PROVIDES ITS CODE TO YOU ON AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
