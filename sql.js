const express = require('express');
const app = express()
const sqlite3 = require('sqlite3').verbose();

// SQL for addItem.js

exports.selectCategories = (req, res) => {
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    })
    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-item", { data: array })
    })
    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
} 

exports.addItem = (req, res) => {
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });
    let entryDate = req.body.entryDate
    let category = req.body.category
    let itemName = req.body.itemName
    let itemQty = req.body.itemQty
    let expDate = req.body.expDate
    let notes = req.body.notes

    let addNewItem = db.run('INSERT INTO items (item_entry_date, item_name, item_quantity, item_expiration_date, item_notes, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [entryDate, itemName, itemQty, expDate, notes, 1, category], function(err) {
        if (err) console.log(err.message);
    })
    // let total
    let categoryTotal = db.get("SELECT category_total_items FROM categories WHERE category_id = ?", [category], function(err, categoryTotal) {
        if (err) console.log(err.message)
        let total = categoryTotal.category_total_items + parseInt(itemQty)
        console.log(total)
        db.run('UPDATE categories SET category_total_items = ? WHERE category_id = ?', [total, category], function (err){
            if (err) console.log(err.message)
        })
    })

    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-item", { data: array })
    })
        
    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Close the database connection')
    })
    // res.render("add-item")
}

// SQL for addCategory.js

exports.addCategory = (req, res) => {
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });
    
    let categoryName = req.body.categoryName

    let addNewCategory = db.run('INSERT INTO categories (category_name, user_id) VALUES (?, ?)', [categoryName, 1], function(err) {
        if (err) console.log(err.message);
        // res.render("add-category")
    });

    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-category", { data: array })
    })

    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Close the database connection')
    })
}

exports.selectCategories2 = (req, res) => {
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    })
    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-category", { data: array })
    })
    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
} 

exports.editCategories = (req, res) => {
    let categoryId = req.params.categoryId
    
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let results = db.all("SELECT * FROM categories WHERE category_id = ?", [categoryId], function(err, rows){
        if (err) console.error(err.message)
        let categoryId = rows
        res.render("edit-category", { data: rows})
    })

    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Close the database connection')
    })
}

exports.deleteCategory = (req, res) => {
    let categoryId = req.params.categoryId
    let itemQty = req.body.totalItems
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let deleteCategory = db.run('DELETE FROM categories WHERE category_id = ?', categoryId, (err) => {
        if (err) {
          console.error(err.message);
        }
    })

    let deleteItems = db.run('DELETE FROM items WHERE category_id = ?', categoryId, (err) => {
        if (err) {
          console.error(err.message);
        }
    })

    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-category", { data: array })
    })

    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
}

exports.updateCategoryName = (req, res) => {
    let categoryId = req.params.categoryId
    let categoryName = req.body.categoryName

    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let updateCategoryName = db.run('UPDATE categories SET category_name = ? WHERE category_id = ?', [categoryName, categoryId], function (err){
        if (err) console.log(err.message)
    })

    let results = db.all("SELECT * FROM categories", function(err, rows){
        if (err) console.error(err.message)
        array = rows
        res.render("add-category", { data: array })
    })

    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
}

// SQL for index.js

exports.getItemsData = (req, res) => {
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let results = db.all("SELECT * FROM items ORDER BY item_expiration_date", function(err, rows){
        if (err) console.error(err.message)
        res.render("index", { data: rows })
    })

    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Close the database connection')
    })
}

exports.editItems = (req, res) => {
    let itemId = req.params.itemId
    
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let results = db.all("SELECT * FROM items WHERE item_id = ?", [itemId], function(err, rows){
        if (err) console.error(err.message)
        res.render("edit-items", { data: rows})
    })

    db.close((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Close the database connection')
    })
}

exports.updateItemName = (req, res) => {
    let itemId = req.params.itemId
    let itemEntryDate = req.body.itemEntryDate
    let itemName = req.body.itemName
    let itemQuantity = req.body.itemQuantity
    let itemExpDate = req.body.itemExpDate
    let itemNotes = req.body.itemNotes

    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let updateCategoryName = db.run('UPDATE items SET item_entry_date = ?, item_name = ?, item_quantity = ?, item_expiration_date = ?, item_notes = ? WHERE item_id = ?', [itemEntryDate, itemName, itemQuantity, itemExpDate, itemNotes, itemId], function (err){
        if (err) console.log(err.message)
    })

    let results = db.all("SELECT * FROM items ORDER BY item_expiration_date", function(err, rows){
        if (err) console.error(err.message)
        res.render("index", { data: rows })
    })

    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
}

exports.deleteItems = (req, res) => {
    let itemId = req.params.itemId
    let itemQty = req.body.totalItems
    let db = new sqlite3.Database('testDB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the testDB SQlite database.')
    });

    let deleteItems = db.run('DELETE FROM items WHERE item_id = ?', itemId, (err) => {
        if (err) {
          console.error(err.message);
        }
    })

    let results = db.all("SELECT * FROM items ORDER BY item_expiration_date", function(err, rows){
        if (err) console.error(err.message)
        res.render("index", { data: rows })
    })

    db.close((err) => {
        if(err) console.error(err.message)
        console.log('Close the database connection')
    })
}