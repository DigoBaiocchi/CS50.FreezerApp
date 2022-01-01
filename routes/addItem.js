const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const data = require('../sql')
const sqlite3 = require('sqlite3').verbose();

router.get("/", data.selectCategories)

router.post("/", data.addItem)


module.exports = router