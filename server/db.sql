-- database to hold the e-commerce application resource
create database eCommerceDB;

-- use the created database 
use eCommerceDB;


-- seller
create table seller(
    id integer primary key auto_increment,
    name varchar(100),
    phone varchar(13),
    email varchar(50),
    password varchar(100),
    address varchar(1000),
    isActive int(1) default 1,
    createdTimestamp timestamp default CURRENT_TIMESTAMP
);

-- customer
create table customer(
    id integer primary key auto_increment,
    name varchar(100),
    phone varchar(13),
    email varchar(50),
    password varchar(100),
    address varchar(1000),
    isActive int(1) default 1,
    createdTimestamp timestamp default CURRENT_TIMESTAMP
);

-- product
create table product (
    id integer primary key auto_increment,
    title varchar(100),
    description varchar(10000),
    image varchar(100),
    mrp float,
    discount float,
    category varchar(100),
    company varchar(100),
    sellerId INTEGER,
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- product reviews
create table productReview (
    id INTEGER PRIMARY KEY auto_increment,
    productId INTEGER,
    buyerId INTEGER,
    review VARCHAR(1000),
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- orderMaster
-- status:
-- 0: created, 1: dispatched, 2: out_for_delivery, 3: delivered, 4: cancelled
CREATE table orderMaster(
    id INTEGER PRIMARY key auto_increment,
    buyerId INTEGER,
    total FLOAT,
    status INTEGER DEFAULT 0, 
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- orderDetails
CREATE TABLE orderDetails(
    id INTEGER PRIMARY key auto_increment,
    orderId INTEGER,
    productId INTEGER,
    quantity INT,
    mrp float,
    price float,
    total FLOAT,
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- cart
CREATE TABLE cart(
    id INTEGER PRIMARY key auto_increment,
    buyerId INTEGER,
    productId INTEGER,
    quantity INT,
    mrp float,
    price float,
    total FLOAT,
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);