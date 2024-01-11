DROP DATABASE IF EXISTS munchmonitor_db;
CREATE DATABASE munchmonitor_db;

CREATE TABLE user (
     id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     username VARCHAR(50) NOT NULL,
     password  NVARCHAR(50) NOT NULL
);