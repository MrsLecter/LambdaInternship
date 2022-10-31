declare global {
  interface Array<T> {
    /**
     * Allows you to multiply each of the array elements by a specified multiplier.
     * @param factor optional multiplier for each element of the array.
     * @return String number with decimal precision.
     */
    multiply<T>(factor?: number): T[];
    /**
     * Returns true if all elements match the given predicate.
     * @param arr Array of numbers
     * @param predicate predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @return Boolean
     */
    all<T>(
      predicate: (value: T, index: number, array: T[]) => boolean,
    ): boolean;
    /**
     * Returns true if sequence has at least one element.
     * @param arr Array of numbers
     * @param predicate Function-parametr for matching
     * @return Boolean
     */
    any<T>(
      predicate: (value: T, index: number, array: T[]) => boolean,
    ): boolean;
    /**
     * Build maps from the elements of a collection indexed by the specified key. Uses the last suitable element as the value.
     * @param keySelector key.
     * @param valueSelector will be stored in the value of the map element.
     * @return Map with {keySelector: valueSelector}
     */
    associateBy<T, K, V>(keySelector: K, valueSelector?: V): Map<K, V>;
    /**
     * Builds a list of all suitable elements and puts it in the value
     * @param keySelector key
     * @param valueSelector will be stored in the value of the map element.
     * @return Map with {keySelector: valueSelector[]}
     */
    groupBy<T, K, V>(keySelector: K, valueSelector?: V): Map<K, Array<V>>;
    /**
     * Returns an average value of elements in the sequence.
     * @return String number with decimal precision.
     */
    average<T>(): number | T[];
    /**
     * Splits collection into a list of lists each not exceeding the given size.
     * @param elementsAmount size of each lists.
     * @return List with elements then have given size.
     */
    chunked<T>(elementsAmount: number): Array<T>[];
    /**
     * Returns a list containing only elements from the given array that have different keys returned by this selector function .
     * @param callback Function-condition
     * @return List with elements.
     */
    distinctBy<T, K>(callback: (arg: T) => K): Array<T>;
    /**
     * Returns a list containing only elements matching the given callback.
     * @param callback Function-condition
     * @return Map with filtered elements.
     */
    filterBy<T>(
      callback: (value: T, index: number, array: T[]) => boolean,
    ): Map<number, T>;
    /**
     * Returns a list containing only elements not matching the given callback.
     * @param callback Function-condition
     * @return Map with filtered elements.
     */
    filterNot<T>(
      callback: (value: T, index: number, array: T[]) => boolean,
    ): Map<number, T>;
    /**
     * Returns a list containing only elements matching the given callback.
     * @param callback Function that takes the index of an element and the element itself and returns the result of predicate evaluation on the element.
     * @return List with filtered elements.
     */
    filterIndexed<T>(callback: (index: number, item: T) => boolean): Array<T>;
    /**
     * Returns a single list of all elements from all arrays in the given array.
     * @param depth By how many nesting levels the dimensionality of the original array decreases.
     * @return Array flat.
     */
    flatten<T>(depth: number): Array<T>;
    /**
     * Returns the first element matching the given predicate, or null if no such element was found.
     * @param callback function, which include condition.
     * @return element
     *
     * */
    findBy<T>(callback: (arg: T) => boolean): T | null;
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
    fold<T, R>(callback: (acc: R, item: T) => R, initial: R): R | null;
    /**
     * Return largest value from property
     * @param selector property of object.
     * @return number of elements or largest string.
     */
    maxBy<T>(selector: string): number | string;
    /**
     * Return smallest value from property
     * @param selector property of object.
     * @return number of elements or smallest string.
     */
    minBy<T>(selector: string): number | string;
    /**
     * Counts the sum of the values in the specified properties (selector)
     * @param selector property of object as [property] or [property.length]
     * @return number of elements.
     */
    count<T>(selector: (arg: T) => boolean): number;
  }
}

export {};
