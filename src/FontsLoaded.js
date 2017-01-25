const testString = '#%-&GgWwOoqQLlAaSs680';

class FontsLoaded {
  /**
  * @param {Array} elementArray - An array of HTML Elements.
  * @param {Number} maxCheckCount - The number of 50ms intervals to check.
   */
  constructor(elementArray, maxCheckCount = 20) {
    this.getFontFamilies(elementArray);
    this.createFontElements();
    this.initialWidths = this.getWidths();
    this.hasLoaded = false;
    this.maxCheckCount = maxCheckCount;
  }

  destroy() {
    clearInterval(this.checkInterval);
    this.testWrapper.remove();
  }

  /**
   * A public method used to compare the current widths of the created font HTML Elements
   * to their initial values on an interval. Returns a Promise and resolves if the
   * current value does not match the initial, or after a configurable
   * number of 50ms intervals.
   *
   * The Promise will never reject as we will always want to continue onto
   * the `then`, since there are virtually no cases where a site sohuld not display
   * content due to a missing font.
   *
   * @return {Promise} A promise that will resolve when the check is complete.
   */
  check() {
    return new Promise((resolve) => {
      const maxCheckCount = this.maxCheckCount;
      let checkCount = 0;

      this.checkInterval = setInterval(() => {
        if (checkCount === maxCheckCount || this.allChanged()) {
          this.hasLoaded = true;
          resolve({
            checkCount: checkCount,
            maxCheckCount: maxCheckCount
          });
          this.destroy();
        }
        checkCount++;
      }, 50);
    });
  }

  /**
   * Set the internal array of font families based on the given test elements.
   *
   * @param {Array} elementArray - The array of selectors to pull fonts from.
   */
  getFontFamilies(elementArray) {
    this.fontFamilies = elementArray.map((el) => {
      return getComputedStyle(el)['font-family'];
    });
  }

  /**
   * Create a wrapper div that is hidden and append test elements with the font
   * families of the existing HTML Elements in the elementArray argument. The
   * wrapper is appended to the container.
   */
  createFontElements() {
    const testWrapper = document.createElement('div');
    this.testWrapper = testWrapper;
    testWrapper.style.cssText = 'position: absolute; visibility: hidden; z-index: -1; pointer-events: none;';
    testWrapper.setAttribute('aria-role', 'hidden');

    this.fontFamilies.forEach((fontFamily) => {
      const fontTestElement = document.createElement('span');
      fontTestElement.style.cssText = 'font-family: ' + fontFamily +
        'font-size: 300px; white-space: nowrap;';
      fontTestElement.setAttribute('aria-role', 'hidden');
      // Use a mix of characters which may vary in width between font families.
      fontTestElement.innerHTML = testString;
      testWrapper.appendChild(fontTestElement);
    });

    document.body.appendChild(testWrapper);
  }

  /**
   * Get the widths from each rendered check node.
   *
   * @return {Array} The array of widths.
   */
  getWidths() {
    const childNodesArray = Array.prototype.slice.call(this.testWrapper.childNodes);
    return childNodesArray.map((fontNode) => fontNode.offsetWidth);
  }

  /**
   * Determine whether the widths of all of the check test elements have changed.
   *
   * @return {Boolean} Whether or not all widths have changed.
   */
  allChanged() {
    return this.getWidths().every((width, index) => {
      return width !== this.initialWidths[index];
    });
  }
}

export default FontsLoaded;
