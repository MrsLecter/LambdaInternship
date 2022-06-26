const express = require("express");
const router = express.Router();
const {getInfo, postInfo} = require("../controllers/correctarium");

router.get('/', getInfo);
router.post('/', postInfo);

module.exports = router;