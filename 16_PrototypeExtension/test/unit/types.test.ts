const arrayFunctionDefinition = require("../../dist/index");
import "../../src/types/global";
describe("test .multiply function", () => {
  test("use number as argumets: arr = [1,2,3,4,5]", () => {
    const arr = [1, 2, 3, 4, 5];
    const expected = [5, 10, 15, 20, 25];
    expect(arr.multiply(5)).toEqual(expected);
  });
  test("use string as argumets: arr = ['u', 'f','f']", () => {
    const arr = ["u", "f", "r"];
    const expected = ["uuu", "fff", "rrr"];
    expect(arr.multiply(3)).toEqual(expected);
  });
  test("use mixed types of argumets: arr = [ 9, {key: 'abc'},'somestring']", () => {
    const arr = [9, { key: "abc" }, "somestring"];
    const expected = [9, { key: "abc" }, "somestring"];
    expect(arr.multiply(3)).toEqual(expected);
  });
});

describe("test .all function", () => {
  test("use number as argumets: arr = [1,2,3,4,5]", () => {
    const arr = [1, 2, 3, 4, 5];
    const isEven = (num) => (num % 2 === 0 ? true : false);
    const expected = false;
    expect(arr.all(isEven)).toBe(expected);
  });
});

describe("test .any function", () => {
  test("use number as argumets: arr = [1,2,3,4,5]", () => {
    const arr = [1, 2, 3, 4, 5];
    const isEven = (num) => (num % 2 === 0 ? true : false);
    const expected = true;
    expect(arr.any(isEven)).toBe(expected);
  });
});

describe("test .associateBy function", () => {
  test("use object as argumets, associateBuy keySelector", () => {
    const arr = [
      { firstName: "Grace", lastName: "Hooper", city: "Kharkov" },
      { firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" },
      { firstName: "Johann", lastName: "Bernoulli", city: "Odessa" },
    ];
    const expected = new Map([
      ["Kharkov", { firstName: "Grace", lastName: "Hooper", city: "Kharkov" }],
      ["Dnepr", { firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" }],
      [
        "Odessa",
        { firstName: "Johann", lastName: "Bernoulli", city: "Odessa" },
      ],
    ]);
    expect(arr.associateBy("city")).toEqual(expected);
  });

  test("use object as arguments, asociateBuy keySelector, valueSelector", () => {
    const arr = [
      { firstName: "Grace", lastName: "Hooper", city: "Kharkov" },
      { firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" },
      { firstName: "Johann", lastName: "Bernoulli", city: "Odessa" },
    ];
    const expected = new Map([
      ["Kharkov", "Hooper"],
      ["Dnepr", "Bernoulli"],
      ["Odessa", "Bernoulli"],
    ]);
    expect(arr.associateBy("city", "lastName")).toEqual(expected);
  });
});

describe("test .groupBy function", () => {
  test("use object as argumets, groupBy keySelector", () => {
    const arr = [
      { firstName: "Grace", lastName: "Hooper", city: "Kharkov" },
      { firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" },
      { firstName: "Johann", lastName: "Bernoulli", city: "Kharkov" },
    ];
    const expected = new Map([
      [
        "Kharkov",
        [
          { firstName: "Grace", lastName: "Hooper", city: "Kharkov" },
          { firstName: "Johann", lastName: "Bernoulli", city: "Kharkov" },
        ],
      ],
      ["Dnepr", [{ firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" }]],
    ]);
    expect(arr.groupBy("city")).toEqual(expected);
  });

  test("use object as argumets, group by keySelector and valueSelector", () => {
    const arr = [
      { firstName: "Grace", lastName: "Hooper", city: "Kharkov" },
      { firstName: "Jacob", lastName: "Bernoulli", city: "Dnepr" },
      { firstName: "Johann", lastName: "Bernoulli", city: "Kharkov" },
    ];
    const expected = new Map([
      ["Kharkov", ["Hooper", "Bernoulli"]],
      ["Dnepr", ["Bernoulli"]],
    ]);
    expect(arr.groupBy("city", "lastName")).toEqual(expected);
  });
});

describe("test .average function", () => {
  test("use number as argumets: arr = [1,2,3,4,5]", () => {
    const arr = [1, 2, 3, 4, 5];
    const expected = 3;
    expect(arr.average()).toBe(expected);
  });
});

describe("test .chunked function", () => {
  test('use string as argumets: arr = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]', () => {
    const arr = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const expected = [["Q", "W", "E"], ["R", "T", "Y"], ["U", "I", "O"], ["P"]];
    expect(arr.chunked(3)).toEqual(expected);
  });
});

describe("test .distinctBy function", () => {
  test("use string as argumets: arr = ['a', 'A', 'b', 'B', 'A', 'a']", () => {
    const arr = ["a", "A", "b", "B", "A", "a"];
    const isUpperCase = (item) => item.toUpperCase() === item;
    const expected = ["A", "B", "A"];
    expect(arr.distinctBy(isUpperCase)).toEqual(expected);
  });
});

describe("test .filterBy function", () => {
  test("use string as argumets: arr = ['a', 'A', 'b', 'B', 'A', 'a']", () => {
    const arr = ["H", "A", "H", "B", "A", "a"];
    const isUpperCase = (item, index) => {
      if (item.toUpperCase() === item) {
        if (index % 2 === 0) {
          return true;
        }
      }
      return false;
    };

    const expected = new Map([
      [0, "H"],
      [2, "H"],
      [4, "A"],
    ]);
    expect(arr.filterBy(isUpperCase)).toEqual(expected);
  });
});

describe("test .filterNot function", () => {
  test("use string as argumets: arr = ['a', 'A', 'b', 'B', 'A', 'a']", () => {
    const arr = ["H", "A", "H", "B", "A", "a"];
    const isUpperCase = (item, index) => {
      if (item.toUpperCase() === item) {
        if (index % 2 === 0) {
          return true;
        }
      }
      return false;
    };

    const expected = new Map([
      [1, "A"],
      [3, "B"],
      [5, "a"],
    ]);
    expect(arr.filterNot(isUpperCase)).toEqual(expected);
  });
});

describe("test .filterIndexed function", () => {
  test("use string as argumets: arr = [0, 1, 9, 3, 8, 8, 6]", () => {
    const arr = [0, 1, 9, 3, 8, 8, 6];
    const isEqual = (index, item) => item === index;
    const expected = [0, 1, 3, 6];
    expect(arr.filterIndexed(isEqual)).toEqual(expected);
  });
});

describe("test .findBy function", () => {
  test("use string as argumets: arr = [1, 2, 3, 4, 5, 6, 7]", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const isEqual = (item) => item % 2 != 0;
    const expected = 1;
    expect(arr.findBy(isEqual)).toBe(expected);
  });
});

describe("test .flaten function", () => {
  test("use string as argumets: arr = [[1], [2,[3]], [4,[5,[6]]]", () => {
    const arr = [[1], [2, [3]], [4, [5, [6]]]];
    const expected = [1, 2, 3, 4, 5, 6];
    expect(arr.flatten(3)).toEqual(expected);
  });
});

describe("test .fold function", () => {
  test("use string as argumets: arr = [1, 3, 5]", () => {
    const arr = [1, 3, 5];
    const riseTo3AndMultiply = (acc, item) => acc * item ** 3;
    const expected = 3375;
    expect(arr.fold(riseTo3AndMultiply, 1)).toBe(expected);
  });
});

describe("test .maxBy function", () => {
  test("use object as argumets", () => {
    const arr = [
      { name: "Alice", points: 42 },
      { name: "Bob", points: 28 },
      { name: "Mike", points: 51 },
    ];
    const expected = 51;
    expect(arr.maxBy("points")).toBe(expected);
  });
});

describe("test .minBy function", () => {
  test("use object as argumets", () => {
    const arr = [
      { name: "Alice", points: 42 },
      { name: "Bob", points: 28 },
      { name: "Mike", points: 51 },
    ];
    const expected = 28;
    expect(arr.minBy("points")).toBe(expected);
  });
});

describe("test .count function", () => {
  test("use string as argumets", () => {
    const arr = ["co", "com", "iso", "dev", "io", "in"];
    const itemCondition = (item) => item.length === 2;
    const expected = 3;
    expect(arr.count(itemCondition)).toBe(expected);
  });
});
