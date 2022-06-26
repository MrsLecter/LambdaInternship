export function addWorkingHours(demanded_working_hours: number, date: Date): Date {
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

            const curentMinutes = date.getMinutes();
            const currentHours = date.getHours();

            const max_hours = 19;
            let date2: Date= new Date(date);
            date2.setHours(19);
            date2.setMinutes(0);
            date2.setSeconds(0);
            date2.setMilliseconds(0);
            const working_time_range: number = +date2 - +date;
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
    return date;
}


export function setRightHours(date:Date): Date {
    date.setHours(10);
    date.setMinutes(0);
    return date;
}


export function ifCurrentHourInRange(data: Date): boolean {
    if (
        data.getHours() > 19 ||
        data.getHours() < 10 ||
        (data.getHours() === 19 && data.getMinutes() > 0)
    ) {
        return false;
    }
        return true;
}

export function getNextDay(date: Date):Date {
    date.setMilliseconds(24 * 60 * 60 * 1000);
    return date;
}

export function ifCurrentDayInRange(date: Date): boolean {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
        return true;
    }
    return false;
}

export function fitInRange(date: Date): Date {
    let counterDay = 0;
    let inRange = ifCurrentDayInRange(date);
    while (inRange !== true) {
        counterDay += 1;
        getNextDay(date);
        inRange = ifCurrentDayInRange(date);
    }
    setRightHours(date);
    return date;
}

export function toCalculateDeadline(working_time: number, date: Date): Date {
    if (!ifCurrentDayInRange(date)) {
        fitInRange(date);
    }
    addWorkingHours(working_time, date);
    return date;
}