const sequelize = require('../config/connection');
const { User, Pet, Feeder } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');
const feederData = require('./feederData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Pet.bulkCreate(petData, {
    returning: true,
  });

   await Feeder.bulkCreate(feederData, {
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
