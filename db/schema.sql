DROP DATABASE IF EXISTS munchmonitor_db;
CREATE DATABASE munchmonitor_db;

CREATE TABLE user (
     id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     username VARCHAR(50) NOT NULL,
     password  NVARCHAR(50) NOT NULL
);

CREATE TABLE pet (
     pet_id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     pet_name VARCHAR(100) NOT NULL,
     pet_type VARCHAR(20) NOT NULL,
     pet_sex VARCHAR(10) NOT NULL,
     pet_notes TEXT NOT NULL,
     pet_owner INTEGER NOT NULL,
     FOREIGN KEY (pet_owner) REFERENCES user(id)
);

CREATE TABLE feeder (
     feed_id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     feed_date DATE NULL, 
     pet_id INTEGER NOT NULL,
     breakfast_food_type VARCHAR(20) NULL,
     lunch_food_type VARCHAR(20) NULL,
     dinner_food_type VARCHAR(20) NULL,
     FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
);