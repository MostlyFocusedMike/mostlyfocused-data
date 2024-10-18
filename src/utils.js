export const addTag = (tagName, parentOrSelector, id, className, node) => {
  const tag = document.createElement(tagName);
  if (id) tag.id = id;
  if (className) tag.classList.add(className);
  if (node) tag.append(node);
  const parentElement = (typeof parentOrSelector === 'object')
    ? parentOrSelector
    : document.querySelector(parentOrSelector);
  parentElement.append(tag);

  return tag;
}

export const addUlEl = (parentOrSelector, id, className) => {
  return addTag('ul', parentOrSelector, id, className)
}

export const addLiEl = (parentOrSelector, node, className, id) => {
  return addTag('li', parentOrSelector, id, className, node)
}

/**
 *
 * @param {string} tag
 * @param {{attrName: attrVal}} dataAttrs
 */
export const addDataset = (tag, dataAttrs, { opts = 'ok' }) => {
  console.log('opts:', opts);
  // remember camelCase: val -> data-camel-case="val"
  for (key in dataAttrs) {
    tag.dataset[key] = dataAttrs[key];
  }
}

export const timeStr = (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);

  let hours = date.getHours();
  const amOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes} ${amOrPm}`;
}

export const dateStr = (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = new Date(date).toLocaleDateString('en-us', { weekday: 'long'});

  return `${dayOfWeek[0]}, ${month}/${day}`;
}


export const escapeText = (str) => str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");


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