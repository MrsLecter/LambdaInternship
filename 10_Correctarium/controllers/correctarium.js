let inputObj = {};
const { validationResult } = require('express-validator');
const {getDeadline, getCalculatedTimeMs} = require("../dist/deadline");
const {getCost} = require("../dist/cost");

exports.postInfo = (req, res, next) => {
    //handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const input = req.body;
    inputObj = {
        "language": input.language,
        "mimetype": input.mimetype,
        "count": input.count
    };
    res.redirect('/correctarium');
};

exports.getInfo = (req, res, next) => {
    const calculatedCost = getCost(inputObj.language, inputObj.count, inputObj.mimetype);
    const timeForWork = getCalculatedTimeMs(inputObj.language, inputObj.count, inputObj.mimetype);
    
    const calculatedDeadline = getDeadline(inputObj.language, inputObj.count, inputObj.mimetype, new Date());
    const unixTimeStamp = Math.floor(calculatedDeadline.getTime() / 1000);
    res.json({
        "price": calculatedCost,
        "time": timeForWork,
        "deadline": unixTimeStamp,
        "deadline_date": calculatedDeadline.toLocaleString()
    });
};
