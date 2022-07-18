"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverage = function (arr) {
    var avg = arr[0];
    for (var i = 1; i < arr.length; i++) {
        for (var _i = 0, _a = Object.entries(arr[i]); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key.localeCompare('timestamp') !== 0) {
                avg[key] = +avg[key] + +value;
                if (i === arr.length - 1) {
                    avg[key] = (+avg[key] / (arr.length)).toFixed(5);
                }
            }
        }
    }
    return avg;
};
