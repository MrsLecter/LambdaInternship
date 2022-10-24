const funcCycle = require("../../dist/sortCycle");
const vacationShedule = require("../../vacationShedule.json");
const rightVacationShedule = require("./reightOrderVacation.json");

test("test getShortedVacationShedule function  in sortCycle file", () => {
  const expected = rightVacationShedule;
  const result = funcCycle.getShortedVacationSheduleCycle(vacationShedule);
  expect(result).toEqual(expected);
});
