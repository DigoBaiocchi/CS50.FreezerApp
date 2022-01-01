const express = require('express');
const router = express.Router();
const data = require('../sql')
const sqlite3 = require('sqlite3').verbose();

router.get(("/"), data.selectCategories2)

router.post(("/"), data.addCategory)

router.get('/edit/:categoryId', data.editCategories)

router.get('/delete/:categoryId', data.deleteCategory) 

router.post('/updateName/:categoryId', data.updateCategoryName) 

module.exports = router