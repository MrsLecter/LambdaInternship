declare global {
  interface Array<T> {
    /**
     * Allows you to multiply each of the array elements by a specified multiplier.
     * @param factor optional multiplier for each element of the array.
     * @return String number with decimal precision.
     */
    multiply(factor?: number): number[];
    /**
     * Returns true if all elements match the given predicate.
     * @param arr Array of numbers
     * @param callback Function-parametr for matching
     * @return Boolean
     */
    all(callback: Function): boolean;
    /**
     * Returns true if sequence has at least one element.
     * @param arr Array of numbers
     * @param callback Function-parametr for matching
     * @return Boolean
     */
    any(callback: Function): boolean;
    /**
     * Build maps from the elements of a collection indexed by the specified key. Uses the last suitable element as the value.
     * @param keySelector key.
     * @param valueSelector will be stored in the value of the map element.
     * @return Object with {keySelector: valueSelector}
     */
    associateBy(keySelector: string, valueSelector?: string): Object;
    /**
     * Builds a list of all suitable elements and puts it in the value
     * @param keySelector key
     * @param valueSelector will be stored in the value of the map element.
     * @return Object with {keySelector: valueSelector}
     */
    groupBy(keySelector: string, valueSelector?: string): Object;
    /**
     * Returns an average value of elements in the sequence.
     * @return String number with decimal precision.
     */
    average(): string;
    /**
     * Splits collection into a list of lists each not exceeding the given size.
     * @param elementsAmount size of each lists.
     * @return List with elements then have given size.
     */
    chunked(elementsAmount: number): Array<T>[];
    /**
     * Returns a list containing only elements from the given array that have different keys returned by this selector function .
     * @param callback Function-condition
     * @return List with elements.
     */
    distinctBy(callback: Function): Array<T>;
    /**
     * Returns a list containing only elements matching the given callback.
     * @param callback Function-condition
     * @return List with filtered elements.
     */
    filter(callback: Function): Array<T>;
    /**
     * Returns a list containing only elements not matching the given callback.
     * @param callback Function-condition
     * @return List with filtered elements.
     */
    filterNot(callback: Function): Array<T>;
    /**
     * Returns a list containing only elements matching the given callback.
     * @param callback Function that takes the index of an element and the element itself and returns the result of predicate evaluation on the element.
     * @return List with filtered elements.
     */
    filterIndexed(callback: Function): Array<T>;
    /**
     * Returns a single list of all elements from all arrays in the given array.
     * @param depth By how many nesting levels the dimensionality of the original array decreases.
     * @return Array flat.
     */
    flatten(depth: number): Array<T>;
    /**
     * Returns the first element matching the given predicate, or null if no such element was found.
     * @param callback function, which include condition.
     * @return element
     */
    find(callback: Function): T | null;
    /**
     * Returns the last element matching the given predicate, or null if no such element was found.
     * @param callback function, which include condition.
     * @return element
     */
    findLast(callback: Function): T | null;
    /**
     * Accumulates value starting with initial value and applying operation from left to right to current accumulator value and each element.
     * @param initial start value.
     * @param callback function that takes current accumulator value and an element, and calculates the next accumulator value.
     * @return Array flat.
     */
    fold(initial: Object, callback: Function): Object;
    /**
     * Return largest value from property
     * @param selector property of object.
     * @return number of elements or largest string.
     */
    maxBy(selector: string): number | string;
    /**
     * Return smallest value from property
     * @param selector property of object.
     * @return number of elements or smallest string.
     */
    minBy(selector: string): number | string;
    /**
     * Counts the sum of the values in the specified properties (selector)
     * @param selector property of object as [property] or [property.length]
     * @return number of elements.
     */
    count(selector: string): number;
  }
}

Array.prototype.multiply = function (factor: number = 10): number[] {
  let multiplied: number[] = [];
  this.forEach((elem) => {
    elem = isNaN(parseFloat(elem)) ? 0 : parseFloat(elem);
    multiplied.push(elem * factor);
  });
  return multiplied;
};

Array.prototype.all = function (callback): boolean {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i])) {
      return false;
    }
  }
  return true;
};

Array.prototype.any = function (callback): boolean {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return true;
    }
  }
  return false;
};

Array.prototype.associateBy = function (
  keySelector: string,
  valueSelector?: string,
): Object {
  let objRez: {
    [key: string]: string | Object;
  } = {};
  for (let i = 0; i < this.length; i++) {
    if (this[i].hasOwnProperty(keySelector)) {
      objRez[this[i][keySelector]] = valueSelector
        ? this[i][valueSelector]
        : this[i];
    }
  }
  return objRez;
};

Array.prototype.groupBy = function (
  keySelector: string,
  valueSelector?: string,
): Object {
  let objRez: {
    [key: string]: string[] | Object[];
  } = {};
  for (let i = 0; i < this.length; i++) {
    if (this[i].hasOwnProperty(keySelector)) {
      const prop = valueSelector ? this[i][valueSelector] : this[i];
      if (objRez.hasOwnProperty(this[i][keySelector])) {
        objRez[this[i][keySelector]].push(prop);
      } else {
        objRez[this[i][keySelector]] = [prop];
      }
    }
  }
  return objRez;
};

Array.prototype.average = function (): string {
  let numb = 0;
  this.forEach((item) => {
    numb += parseFloat(item);
  });
  return (numb / this.length).toFixed(1);
};

Array.prototype.chunked = function (elementsAmount: number): Array<Object>[] {
  let rezultList = [] as Array<Object>[];
  let iterList = 0;
  let iterElem = 0;
  rezultList[0] = [];

  for (let i = 0; i < this.length; i++) {
    if (iterElem === elementsAmount) {
      iterElem = 0;
      iterList++;
      rezultList[iterList] = [];
    }
    rezultList[iterList].push(this[i]);
    iterElem++;
  }
  return rezultList;
};

Array.prototype.distinctBy = function (callback: Function): Array<Object> {
  let arr = [] as Array<Object>;

  this.forEach((item) => {
    if (callback(item)) {
      if (!arr.includes(item.key)) {
        arr.push(item);
      }
    }
  });
  return arr;
};

Array.prototype.filter = function (callback: Function): Array<Object> {
  let arr = [] as Array<Object>;

  this.forEach((item) => {
    if (callback(item)) {
      arr.push(item);
    }
  });
  return arr;
};

Array.prototype.filterNot = function (callback: Function): Array<Object> {
  let arr = [] as Array<Object>;

  this.forEach((item) => {
    if (!callback(item)) {
      arr.push(item);
    }
  });
  return arr;
};

Array.prototype.filterIndexed = function (callback: Function): Array<Object> {
  let arr = [] as Array<Object>;

  this.forEach((item, index) => {
    console.log(item, index);
    if (callback(item, index)) {
      arr.push(item);
    }
  });
  return arr;
};

Array.prototype.find = function (callback: Function): Object | null {
  if (callback(this)) {
    return callback(this);
  }
  return null;
};

Array.prototype.flatten = function (depth: number): Array<Object> {
  const flat = [] as Array<Object>;

  function pullUp(arr: Array<Object>, d: number) {
    for (let i = 0; i < arr.length; i++) {
      if (d > 0 && Array.isArray(arr[i])) {
        pullUp(arr[i] as Array<Object>, d - 1);
      } else {
        flat.push(arr[i]);
      }
    }
  }

  pullUp(this, depth);
  return flat;
};

Array.prototype.fold = function (initial: Object, callback: Function): Object {
  let accum = initial === undefined ? this[0] : initial;
  let start = initial === undefined ? 1 : 0;
  if (this.length > 0) {
    for (let i = start; i < this.length; i++) {
      accum = callback(accum, this[i]);
    }
  }
  return accum;
};

Array.prototype.maxBy = function (selector: string): number | string {
  let max;
  if (selector.includes(".")) {
    let prop = selector.split(".")[0];
    let len = selector.split(".")[1];
    if (!(len.localeCompare("length") === 0)) {
      throw new Error(
        "Invalid selector. You should use fromat: [proprety].length",
      );
    }
    if (this[0].hasOwnProperty(prop)) {
      max = this[0][prop];
    } else {
      throw new Error("1All objects must have the selector");
    }
    for (let i = 1; i < this.length; i++) {
      if (this[i].hasOwnProperty(prop)) {
        if (this[i][prop].length > max.length) {
          max = this[i][prop];
        }
      } else {
        throw new Error("2All objects must have the property");
      }
    }
  } else {
    if (this[0].hasOwnProperty(selector)) {
      max = this[0][selector];
    } else {
      throw new Error("All objects must have the selector");
    }
    for (let i = 1; i < this.length; i++) {
      if (this[i].hasOwnProperty(selector)) {
        if (this[i][selector] > max) {
          max = this[i][selector];
        }
      } else {
        throw new Error("All objects must have the selector");
      }
    }
  }
  return max;
};

Array.prototype.minBy = function (selector: string): number | string {
  let min;
  if (selector.includes(".")) {
    let prop = selector.split(".")[0];
    let len = selector.split(".")[1];
    if (!(len.localeCompare("length") === 0)) {
      throw new Error(
        "Invalid selector. You should use fromat: [proprety].length",
      );
    }
    if (this[0].hasOwnProperty(prop)) {
      min = this[0][prop];
    } else {
      throw new Error("1All objects must have the selector");
    }
    for (let i = 1; i < this.length; i++) {
      if (this[i].hasOwnProperty(prop)) {
        if (this[i][prop].length < min.length) {
          min = this[i][prop];
        }
      } else {
        throw new Error("2All objects must have the property");
      }
    }
  } else {
    if (this[0].hasOwnProperty(selector)) {
      min = this[0][selector];
    } else {
      throw new Error("All objects must have the selector");
    }
    for (let i = 1; i < this.length; i++) {
      if (this[i].hasOwnProperty(selector)) {
        if (this[i][selector] < min) {
          min = this[i][selector];
        }
      } else {
        throw new Error("All objects must have the selector");
      }
    }
  }
  return min;
};

Array.prototype.count = function (selector: string): number {
  let amount = 0;
  this.forEach((item) => {
    if (item.hasOwnProperty(selector)) {
      amount += parseFloat(item[selector]);
    }
  });
  return amount;
};

export {};
