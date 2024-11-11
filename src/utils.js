export const dateStr = (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long'});

  return `${dayOfWeek[0]}, ${month}/${day}`;
}

/**
 * Utility wrapper for easy html interpolation
 * @param {any[]} array array of values
 * @param {function} callback The function to go into array.map
 * @returns stringified html elements
 */
export const $m = (array, callback) => array.map(callback).join('');

/**
 * utility wrapper for JSON.stringify with base64, with error handling
 * @param {any} value val to stringify
 * @returns stringified object | ''
 */
export const $s = (value) => {
  try {
    return btoa(JSON.stringify(value));
  } catch (err) {
    console.error(err)
    return '';
  }
};

/**
 * utility wrapper for JSON.parse and base64, with error handling
 * @param {any} value val to parse
 * @returns parsed value | false
 */
export const $p = (value) => {
  try {
    return JSON.parse(atob(value));
  } catch (err) {
    console.error(err)
    return false;
  }
}

export const trimRoute = (route) => {
  if (route === '/') return 'mostlyfocused.com'
  if (route === '/pages/articles/') return '/articles'
  return route.replace('/pages/articles', '');
}

export const trimSite = (siteName) => siteName?.replace(/https?:\/\/(www.)?/, '');

/**
 * Any data you want passed into a web component's `.props` method must be in a tuple.
 * The first index values is the css selector, and the second index is what will get passed in. See Example.
 *
 * @param {TemplateStringsArray} strings - Provided by the template string
 * @param {...*} inserts                 - Provided by the template string
 * @returns {(rootEl: HTMLElement) => string} A function that takes in a root element to query and:
 *   1. Applies the dynamic properties to the DOM.
 *   2. Returns the final interpolated string.
 *
 * @example
 * const div = document.createElement('div');
 * const template = html`<my-el ${["my-el", { msg: "hello" }]}></my-el>`(div);
 */
export const html = (strings, ...inserts) => {
  let finalStr = '';
  const dataObjs = [];

  for (let i = 0; i < strings.length; i++) {
    finalStr += strings[i];

    const insert = inserts[i];
    if (insert === undefined) continue;
    typeof insert === 'object' ? dataObjs.push(insert) : finalStr += insert;
  }

  const addingDataToRootElFunction = (rootEl) => {
    const addData = ([select, val]) => rootEl.querySelector(select).props(val);
    requestAnimationFrame(() => dataObjs.forEach(addData));

    return finalStr;
  };

  // In case they don't actually have any dynamic data
  addingDataToRootElFunction.toString = () => finalStr;

  return addingDataToRootElFunction;
}