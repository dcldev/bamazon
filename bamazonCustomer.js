const inquirer = require("inquirer");
const mysql = require("mysql");
const http = require("http");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});


const server = http.createServer((req, res) => {
    console.log('Someone accessed my server!');
});

server.listen(3306, '127.0.0.1', () => {
    console.log('Listening for requests');
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //run BamazonSearch function goes here
});

function bamazonCustomerSearch () {
    prompt([
        
    ])
}