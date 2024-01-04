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
          pet_food_type: { // Wet, Dry and Both
               type: DataTypes.STRING,
               allowNull: false,
          },
          breakfast: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          lunch: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          dinner: {
               type: DataTypes.STRING,
               allowNull: false,
          }
     },
     {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName:'feeder',
     }
);