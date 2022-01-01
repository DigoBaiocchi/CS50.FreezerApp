# CS50.FreezerApp
This is my final project for CS50. For this project I used Javascript, HTML, bootstrap for CSS, the framework used was Express js and SQLite for the database. I wanted to solve a problem I have had for some time. In my home we usually buy a good amount of meat and freeze it. We have a big freezer so sometimes we forget what we have in our freezer and when we added a particular item to our freezer. So I decided to create a Freezer App, where it tracks all items in our freezer and sorts the freezer items by Expiration date, so we know which items to use next.

## server.js
It contains express server, where it manages the different routes for each page

## Sql.js
It contains all the sql commands used for querying database, updating and deleting data and is exported to all routes files

## testDB.db
SQLite3 database create to run the application

### In the folder routes there are 3 js files
#### addCategory.js
It contains all routes used to render addCategory page, edit data and delete data properly

#### addItem.js
It contains all routes used to render addItem page, edit data and delete data properly

#### index.js
It contains all routes used to render Index page, edit data and delete data properly

### Views folder contains 5 files
#### add-category.ejs
Add new categories and display existing categories in ejs format

#### add-item.ejs
Add new item to the database in ejs format

#### edit-category.ejs
Edit category name and delete from database in ejs format

#### edit-item.ejs
Edit item options and delete from database in ejs format

#### Index.ejs
Renders index page and select items from database in ejs format


