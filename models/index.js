const User = require('./User');
const Pet = require('./Pet');
const Feeder = require('./Feeder');

User.hasMany(Pet, {
     foreignKey: 'pet_owner',
});

Pet.belongsTo(User, {
     foreignKey: 'pet_owner',
});

Pet.belongsTo(Feeder, {
     foreignKey: 'pet_id',
});

Feeder.belongsTo(Pet, {
     foreignKey: 'pet_id',
})

Feeder.hasMany(Pet, {
     foreignKey: 'pet_id',
});

module.exports = {User, Pet, Feeder }
