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
        res.status(200).json({ user: loginUserData, message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Router for the homepage
router.get('/homepage', async (req, res) => {
    res.render('homepage');
});

// Router for signup functionality
router.post('/signup', async (req, res) => { 
    try {
        const createSignUpUser = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        res.status(200).json(createSignUpUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to render the profile handlebar
router.get('/profile', async (req, res) => {
    res.render('profile');
});

//Route to render the scheduler handlebar
router.get('/scheduler', async (req, res) => {
    res.render('scheduler');
});

// Router to create a profile from front end
router.post('/profile', async (req, res) => { 
    try {
        const createProfiledb = await Pet.create({
            pet_name: req.body.petName,
            pet_type: req.body.petType,
            pet_sex: req.body.petSex,
            pet_notes: req.body.petNotes,
            pet_owner: req.body.petOwner,
        });

        res.status(200).json(createProfiledb);

    } catch (err) {
        res.status(500).json(err);
    }


});



module.exports = router;