const { User, Pet, Feeder } = require('../models');

const router = require('express').Router();

// Router to display Login page
router.get('/', async( req, res) =>{
    res.render('login');
});

// Router to check whether the login user is valid user or not
router.post('/login', async (req, res) => { 
    try {
        const loginUserData = await User.findOne({
            where: {
                username: req.body.signinemail
            }
        });

        if (!loginUserData) {
            res.status(404).json({ "message": "No matching user" });
            return;
        }

        const validPassword = await loginUserData.checkPassword(req.body.signinpass);

        if (!validPassword) {
            res.status(400).json({ "message": "You entered the wrong password" });
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.sessionUserId = loginUserData.dataValues.id;
            req.session.sessionUserName = loginUserData.dataValues.first_name + " " + loginUserData.dataValues.last_name;
            res.status(200).json({ user: loginUserData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Router for the homepage and Router to get all the Pet profile info
router.get('/homepage', async (req, res) => {
    try {
        const petProfileData = await Pet.findAll({
            where: {
                pet_owner: req.session.sessionUserId,
            }
        });
        const profileData = petProfileData.map(pet => pet.get({ plain: true })); 
        res.render('homepage', {profileData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Router for signup functionality
router.post('/signup', async (req, res) => { 
    try {
        //console.log("User Details===", {...req.body});
        const createSignUpUser = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        //console.log("Created User");
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.sessionUserId = createSignUpUser.dataValues.id;
            req.session.sessionUserName = createSignUpUser.dataValues.first_name + " " + createSignUpUser.dataValues.last_name;
            res.status(200).json({ user: createSignUpUser, message: 'You are now signed in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Route to render the profile handlebar
router.get('/profile', async (req, res) => {
    res.render('profile', {loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
});

//Route to render the scheduler handlebar
router.get('/scheduler:petId', async (req, res) => {
    try{
        const petFeederData = await Pet.findByPk(req.params.petId);
        const petData = petFeederData.get({ plain: true });
        //const petData = petFeederData.map(pet => pet.get({ plain: true }));

        const feederData = await Feeder.findOne({
            where: {
                pet_id: req.params.petId,
                feed_date: new Date(),
            }
        });

        if (feederData) {
            const feederFilteredData = feederData.get({ plain: true }); 
            res.render('scheduler', {petData, feederFilteredData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
        } else {
            res.render('scheduler', {petData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
        }
    }
    catch (err){
        res.status(500).json(err);
    }
});

//Route to render the dev handlebar
router.get('/dev', async (req, res) => {
    res.render('dev', {loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
});

// Router to create a profile from front end
router.post('/profile', async (req, res) => { 
    try {
        const createProfiledb = await Pet.create({
            pet_name: req.body.petName,
            pet_type: req.body.petType,
            pet_sex: req.body.petSex,
            pet_notes: req.body.petNotes,
            pet_owner: req.session.sessionUserId,
        });

        res.status(200).json(createProfiledb);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Router to delete the Pet based on Id. Passing the Id in the body and not as params.
router.delete('/deletepet', async (req, res) => {
    try {
        const deleteFeeder = await Feeder.destroy({
            where: {
                pet_id: req.body.petId,
            }
        });
        if (deleteFeeder) {
            const deletePet = await Pet.destroy({ 
                where: {
                    pet_id: req.body.petId,
                }
            });
            res.status(200).json(deletePet);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Router to Save Pet Scheduler. Added functionality to save and update
router.post('/scheduler', async (req, res) => { 
    try {
        const petFeederData = await Feeder.findOne({
            where: {
                pet_id: req.body.petId,
                feed_date: new Date(),
            }
        });

        if (!petFeederData) {
            if (req.body.breakfastType) {
                const feederDb = await Feeder.create({
                    feed_date: new Date(),
                    pet_id: req.body.petId,
                    breakfast_food_type: req.body.breakfastType,
                });
                res.status(200).json(feederDb);
            }
            if (req.body.lunchType) {
                const feederDb = await Feeder.create({
                    feed_date: new Date(),
                    pet_id: req.body.petId,
                    lunch_food_type: req.body.lunchType,
                });
                res.status(200).json(feederDb);
            }
            if (req.body.dinnerType) {
                const feederDb = await Feeder.create({
                    feed_date: new Date(),
                    pet_id: req.body.petId,
                    dinner_food_type: req.body.dinnerType,
                });
                res.status(200).json(feederDb);
            }
        } else {
            if (req.body.breakfastType) {
                const feederDb = await Feeder.update(
                    {
                        breakfast_food_type: req.body.breakfastType
                    },
                    {
                        where: {
                            pet_id: req.body.petId,
                            feed_date: new Date()
                        }
                    }
                );
                res.status(200).json(feederDb);
            }
            if (req.body.lunchType) {
                const feederDb = await Feeder.update(
                    {
                        lunch_food_type: req.body.lunchType
                    },
                    {
                        where: {
                            pet_id: req.body.petId,
                            feed_date: new Date()
                        }
                    }
                );
                res.status(200).json(feederDb);
            }
            if (req.body.dinnerType) {
                const feederDb = await Feeder.update(
                    {
                        dinner_food_type: req.body.dinnerType
                    },
                    {
                        where: {
                            pet_id: req.body.petId,
                            feed_date: new Date()
                        }
                    }
                );
                res.status(200).json(feederDb);
            }
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//Route to render the edit pet handlebar
router.get('/profile:petId', async (req, res) => {
    try {
        const petData = await Pet.findByPk(req.params.petId);
        const petfilteredData = petData.get({ plain: true });
        //const petData = petFeederData.map(pet => pet.get({ plain: true }));
        res.render('profile', {petfilteredData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
    }
    catch (err){
        res.status(500).json(err);
    }
});

// Router to update Pet
router.put('/profile', async (req, res) => { 
    try {
        const updateProfiledb = await Pet.update(
            {
                pet_notes: req.body.petNotes
            },
            {
                where: {
                    pet_id: req.body.petId,
                }
            }
        );

        res.status(200).json(updateProfiledb);

    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;