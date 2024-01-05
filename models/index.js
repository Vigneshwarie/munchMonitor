const User = require('./User');
const Pet = require('./Pet');
const Feeder = require('./Feeder');

Pet.belongsTo(User, {
     foreignKey: 'pet_owner',
});

Feeder.belongsTo(Pet, {
     foreignKey: 'pet_id',
});

User.hasMany(Pet, {
     foreignKey: 'pet_owner',
});

Feeder.hasMany(Pet, {
     foreignKey: 'pet_id',
});

module.exports = {User, Pet, Feeder }
