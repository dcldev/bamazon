const inquirer = require("inquirer");
const mysql = require("mysql");
let fancyTable = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

//Connecting to mySQL database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    let drawHeader = new fancyTable({
        head: ["BAMAZON"]
    });
    console.log(drawHeader.toString());
    begin();
});

function begin() {
    let query = "SELECT * from products";
    connection.query(query,
        function (err, res) {
            if (err) {
                console.log("There has been an error unable to gather products");
            }
            products = res;

            promptCustomer();
        });
}

function promptCustomer() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome to Bamazon! What would you like to do?",
            choices: [
                "PURCHASE AN ITEM",
                "EXIT"
            ]
        })
        .then(answers => {
            switch (answers.action) {
                case "PURCHASE AN ITEM":
                    displayTable(products);
                    break;
                case "EXIT":
                    console.log("Come again, you must!");
                    connection.end();
                    break;
            }
        });
}


function displayTable() {
    let query = connection.query("SELECT * from products", function (err, res) {
        let drawTable = new fancyTable({
            head: ["ID", "PRODUCT NAME", "DEPARTMENT NAME", "PRICE", "QTY"]
        });

        for (var i = 0; i < res.length; i++) {
            drawTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }

        console.log(drawTable.toString());
        yourMoveKimosabe();

    })

}

function yourMoveKimosabe() {
    inquirer
        .prompt([{
                name: "userInputID",
                type: "number",
                message: "Enter the ITEM ID for the ITEM you want to PURCHASE:",
                min: 1
            },
            {
                name: "userInputQty",
                type: "number",
                message: "Enter the QUANTITY of the AMOUNT you want to PURCHASE:",
                min: 1,
            }
        ]).then(answer => {
            let userInputID = answer.userInputID;
            let userInputQty = answer.userInputQty;

            //run function to display products
            displayCustomerProd(userInputID, userInputQty);
        });
}

function displayCustomerProd(userInputID, userInputQty) {
    connection.query(' SELECT * FROM products', (err, res) => {
        if (err) throw err;
        // console.log(res);
        let pullProduct;

        for (let i = 0; i < res.length; i++) {
            if (res[i].item_id == userInputID) {
                pullProduct = res[i];
            }
        }

        if (pullProduct.stock_quantity >= userInputQty) {
            fullFillOrder(pullProduct, userInputID, userInputQty);
            connection.end();
        } else {
            let drawOutOfStock = new fancyTable({
                head: ["SORRY, WE ARE UNABLE TO FULLFILL YOUR DESIRED ORDER DUE TO LACK OF STOCK."]
            });
            console.log(drawOutOfStock.toString());
        }
    })
};

let fullFillOrder = (pullProduct, userInputID, userInputQty) => {
    let updateQty = pullProduct.stock_quantity - userInputQty;
    let orderTot = pullProduct.price * userInputID;
    let queryMain = "UPDATE products SET stock_quanity = ? where ?";
    let queryDeuce = "UPDATE products SET product_sales = ? where ?";

    connection.query(queryMain, [updateQty,{item_id: userInputID}], (err, res) => {});

    connection.query(queryDeuce, [orderTot, {item_id: userInputID}], (err, res) => {});

    console.log({orderTot});
}
