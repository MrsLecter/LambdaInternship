enum LangTime {
  "ru" = 1333,
  "ua" = 1333,
  "en" = 333,
}
type mime = "none" | "doc" | "docx" | "rtf" | "other";
type lang = "ua" | "ru" | "en";

function getCalculatedTimeMs(language: lang, signCount: number, docType: mime): number {
    const start_time_ms = 30 * 60 * 1000;
    const min_time_ms = 60 * 60 * 1000;
    const time_for_text_ms = Math.ceil(
        (signCount / LangTime[language]) * 60 * 60 * 1000
    );
    let main_time_ms =
        start_time_ms + time_for_text_ms < min_time_ms
        ? min_time_ms
        : start_time_ms + time_for_text_ms;
    if (docType === "other") {
        main_time_ms += main_time_ms * 0.2;
    }
    return main_time_ms;
}


function toCalculateDeadline(working_time: number, date: object): string {
    if (!ifCurrentDayInRange(date)) {
        fitInRange(date);
    }
    addWorkingHours(working_time, date);
    return date.toString();
}


function addWorkingHours(demanded_working_hours: number, date: object): string {
    if (!ifCurrentDayInRange(date)) {
        fitInRange(date);
    } else {
        let completeFlag = false;
        while (completeFlag === false) {
            if (ifCurrentDayInRange(date) && !ifCurrentHourInRange(date)) {
                if (date.getHours() < 5) {
                setRightHours(date);
                } else if (date.getHours() >= 19) {
                getNextDay(date);
                }
            }
            if (!ifCurrentDayInRange(date)) {
                fitInRange(date);
            }
            if (!ifCurrentHourInRange(date)) {
                setRightHours(date);
            }

            let curentMinutes = date.getMinutes();
            let currentHours = date.getHours();

            let max_hours = 19;
            let date2 = new Date(date);
            date2.setHours(19);
            date2.setMinutes(0);
            date2.setSeconds(0);
            date2.setMilliseconds(0);
            let working_time_range = date2 - date;
            if (working_time_range < demanded_working_hours) {
                demanded_working_hours -= working_time_range;
                getNextDay(date);
                setRightHours(date);
            } else if (working_time_range >= demanded_working_hours) {
                date.setMilliseconds(demanded_working_hours);
                completeFlag = true;
            }
        }
    }
    return date.toString();
}


function setRightHours(date:object): void {
    date.setHours(10);
    date.setMinutes(0);
}


function ifCurrentHourInRange(data: object): boolean {
    if (
        data.getHours() > 19 ||
        data.getHours() < 10 ||
        (data.getHours() === 19 && data.getMinutes() > 0)
    ) {
        return false;
    } else {
        return true;
    }
}

function getNextDay(date:object): void {
    date.setMilliseconds(24 * 60 * 60 * 1000);
}

function ifCurrentDayInRange(date:object): boolean {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
        return true;
    }
    return false;
}

function fitInRange(date: object): void {
    let counterDay = 0;
    let inRange = ifCurrentDayInRange(date);
    while (inRange !== true) {
        counterDay += 1;
        getNextDay(date);
        inRange = ifCurrentDayInRange(date);
    }
    setRightHours(date);
}
