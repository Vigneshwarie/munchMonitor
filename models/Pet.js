// Import ORM package and use that for database connection.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Pet extends Model { }

Pet.init(
     {
          pet_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          pet_name: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          pet_type: { // Like Cat or Dog. We will implement the application for these categories and in the future it can be implemented for more pets. 
               type: DataTypes.STRING,
               allowNull:false,
          },
          pet_sex: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          pet_notes: { 
               type: DataTypes.TEXT,
               allowNull:false,
          },
          pet_owner: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: User,
                    key:'id',
               },        
          },
     },
     {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName:'pet',
     }
);