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
    //run BamazonSearch function goes here
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
            name: "item",
            type: "number",
            message: "Enter the ITEM ID for the ITEM you want to PURCHASE:",
            min: 1
        },
            {
            name: "quantity",
            type: "number",
            message: "Enter the QUANTITY of the AMOUNT you want to PURCHASE:",
            min: 1,
            }
        ]);
    };

// products.forEach((product, i) => {
//     console.log(i === product.length);
//       drawTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
//       console.log(drawTable.toString());
//     });
//   });
// };

// products.forEach((product) => {
//     product.sizes.forEach((size) => {
//       console.log(size);
//     });
//   });


// connection.query(query,
//         function (err, res) {
//         products.forEach(function(res, i)



//         }
//         for (var i = 0; i < res.length; i++)
//             if (err) {
//                 console.log("There has been an error unable to gather products");
//             }
//             console.log(res);
//             drawTable.push(res:[{product_name, department_name, price, stock_quantity}]);
//             console.log(drawTable.toString());