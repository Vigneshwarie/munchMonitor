const { User } = require('../models');

const router = require('express').Router();


router.get('/', async( req, res) =>{
    res.render('login');
});

router.post('/', async (req, res) => { 
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

router.get('/homepage', async (req, res) => {
    res.render('homepage');
});


module.exports = router;