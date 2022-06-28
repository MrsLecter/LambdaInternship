const express = require("express");
const { body} = require('express-validator');
const router = express.Router();

const {getInfo, postInfo} = require("../controllers/correctarium");

router.get('/', getInfo);

router.post('/',
body('language').isIn(['en', 'ua', 'ru']).exists(),
body('mimetype').isIn(['doc','docx', 'rtf', 'other']).exists(),
body('count').isNumeric().exists(),
postInfo);

module.exports = router;