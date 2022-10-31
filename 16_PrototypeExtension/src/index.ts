import * as functions from "./utils";
(function () {
  Array.prototype.multiply = function Array<T>(factor: number = 10): Array<T> {
    if (functions.isExpectedElementType(this, "number")) {
      let multiplied: T[] = [];
      this.forEach((elem) => {
        elem = isNaN(parseFloat(elem)) ? 0 : parseFloat(elem);
        multiplied.push((elem * factor) as T);
      });
      return multiplied;
    }
    if (functions.isExpectedElementType(this, "string")) {
      let multiplied: T[] = [];
      this.forEach((item) => {
        multiplied.push(item.repeat(factor));
      });
      return multiplied;
    }
    return this;
  };

  Array.prototype.all = function <T>(
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): boolean {
    for (let i = 0; i < this.length; i++) {
      if (!predicate(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };

  Array.prototype.any = function <T>(
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): boolean {
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };

  Array.prototype.associateBy = function <T, K, V>(
    keySelector: K,
    valueSelector?: V,
  ): Map<K, V> {
    let map = new Map<K, V>();
    for (let i = 0; i < this.length; i++) {
      if (this[i].hasOwnProperty(keySelector)) {
        map.set(
          this[i][keySelector],
          valueSelector ? this[i][valueSelector] : this[i],
        );
      }
    }
    return map;
  };

  Array.prototype.groupBy = function <T, K, V>(
    keySelector: K | T,
    valueSelector?: V | T,
  ): Map<K, Array<V>> {
    let map = new Map<K, Array<V>>();
    for (let i = 0; i < this.length; i++) {
      if (this[i].hasOwnProperty(keySelector)) {
        const prop = valueSelector ? this[i][valueSelector] : this[i];
        if (map.has(this[i][keySelector])) {
          let oldArr = map.get(this[i][keySelector]);
          if (!oldArr) {
            oldArr = [];
          }
          oldArr.push(prop);
          map.set(this[i][keySelector], oldArr);
        } else {
          map.set(this[i][keySelector], [prop]);
        }
      }
    }
    return map;
  };

  Array.prototype.average = function <T>(): number | T[] {
    if (functions.isExpectedElementType(this, "number")) {
      let numb = 0;
      for (let i = 0; i < this.length; i++) {
        numb += this[i];
      }
      return Number((numb / this.length).toFixed(1));
    }
    return this;
  };

  Array.prototype.chunked = function <T>(elementsAmount: number): Array<T>[] {
    let rezultList = [] as Array<T>[];
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

  Array.prototype.distinctBy = function <T, K>(
    callback: (arg: T) => K,
  ): Array<T> {
    let arr = [] as Array<T>;
    this.forEach((item) => {
      if (callback(item)) {
        if (!functions.ifIncludes(arr, item.key)) {
          arr.push(item);
        }
      }
    });
    return arr;
  };

  Array.prototype.filterBy = function <T>(
    callback: (value: T, index: number, array: T[]) => boolean,
  ): Map<number, T> {
    let map = new Map<number, T>();
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        map.set(i, this[i]);
      }
    }
    return map;
  };

  Array.prototype.filterNot = function <T>(
    callback: (value: T, index: number, array: T[]) => boolean,
  ): Map<number, T> {
    let map = new Map<number, T>();
    for (let i = 0; i < this.length; i++) {
      if (!callback(this[i], i, this)) {
        map.set(i, this[i]);
      }
    }
    return map;
  };

  Array.prototype.filterIndexed = function <T>(
    callback: (index: number, item: T) => boolean,
  ): Array<T> {
    let arr = [] as Array<T>;
    for (let i = 0; i < this.length; i++) {
      if (callback(i, this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  };

  Array.prototype.findBy = function <T>(
    callback: (arg: T) => boolean,
  ): T | null {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i])) {
        return this[i];
      }
    }
    return null;
  };

  Array.prototype.flatten = function <T>(depth: number): Array<T> {
    const flat = [] as Array<T>;

    function pullUp(arr: Array<T>, d: number) {
      for (let i = 0; i < arr.length; i++) {
        if (d > 0 && Array.isArray(arr[i])) {
          pullUp(arr[i] as Array<T>, d - 1);
        } else {
          flat.push(arr[i]);
        }
      }
    }

    pullUp(this, depth);
    return flat;
  };

  Array.prototype.fold = function <T, R>(
    callback: (acc: R, item: T) => R,
    initial: R,
  ): R | null {
    if (this.length > 0) {
      let accum = initial === undefined ? this[0] : initial;
      for (let i = 0; i < this.length; i++) {
        accum = callback(accum, this[i]);
      }
      return accum;
    }
    return null;
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

  Array.prototype.count = function <T>(selector: (arg: T) => boolean): number {
    let amount = 0;
    this.forEach((item) => {
      if (selector(item)) {
        amount++;
      }
    });
    return amount;
  };
})();
