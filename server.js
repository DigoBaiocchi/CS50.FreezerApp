const express = require('express');
const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

const addItemRouter = require('./routes/addItem')
const indexRouter = require('./routes/index')
const addCategoryRouter = require('./routes/addCategory')
const editCategoryRouter = require('./routes/editCategory')

app.use("/addItem", addItemRouter)
app.use("/index", indexRouter)
app.use("/addCategory", addCategoryRouter)
app.use("/editCategory", editCategoryRouter)

app.listen(3000)