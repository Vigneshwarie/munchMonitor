// Import ORM package and use that for database connection.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Pet = require('./Pet');

class Feeder extends Model { }

Feeder.init(
     {
          feed_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          feed_date: {
               type: DataTypes.DATEONLY,
               allowNull: false,
          },
          pet_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: Pet,
                    key:'pet_id',
               },        
          },
          breakfast_food_type: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          lunch_food_type: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          dinner_food_type: {
               type: DataTypes.STRING,
               allowNull: true,
          },
     },
     {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName:'feeder',
     }
);

module.exports = Feeder;