DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO songs (title, artist, genre)
VALUES
  ('Human', 'Krewella', 'Dance'), 
  ('TRNDSTTR', 'Black Coast', 'Dance'), 
  ("Yellow Submarine", "The Beatles", "Classic Rock"),
  ("Who's Next", "The Who", "Classic Rock");


  INSERT INTO products
  ( flavor, price, quantity )
VALUES
  ('strawberry', 3.25, 75), 
  ('chcolate', 3.10, 120), 
  ('vanilla', 2.50, 100);