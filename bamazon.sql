DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(65,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products
  ( product_name, department_name, price, stock_quantity )
VALUES
  ('Messages from Goldilocks', 'General Goods', .99, 1000 ), 
  ('Normalize', 'Diplomatic Words', .01, 9999 ), 
  ('Udemy Javascript Course 2019', 'Education', 12.99, 100),
  ('Udemy Fullstack Course 2019', 'Education', 12.99, 100),
  ('Hours Spent Studying', 'Education', 100000000, 20),
  ('Columbia Boot Camp by Trilogy', 'Education', 12000, 5);
