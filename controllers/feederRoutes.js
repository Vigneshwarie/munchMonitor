const { User, Pet } = require('../models');

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
        console.log("User Details===", {...req.body});
        const createSignUpUser = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        console.log("Created User");

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
router.get('/scheduler/:petId', async (req, res) => {
    try{
        const petFeederData = await Pet.findByPk(req.params.petId);
        const petData = petFeederData.get({ plain: true });
        res.render('scheduler', {petData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
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
        const deletePetDb = await Pet.destroy({ 
            where: {
                pet_id: req.body.petId,
            }
        });
        res.status(200).json(deletePetDb);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;