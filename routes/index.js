const express = require('express');
const router = express.Router();
const data = require('../sql')

router.get("/", data.getItemsData)

router.get('/edit/:itemId', data.editItems)

router.post('/updateItem/:itemId', data.updateItemName) 

router.get('/delete/:itemId', data.deleteItems) 

module.exports = router