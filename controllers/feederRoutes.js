const { User } = require('../models');

const router = require('express').Router();


router.get('/', async( req, res) =>{
    res.render('login');
});

router.post('/login', async (req, res) => { 
    try {
        const loginUserData = await User.findOne({
            where: {
                username: req.body.email
            }
        });

        if (!loginUserData) {
            res.status(404).json({ "message": "No matching user" });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ "message": "You entered the wrong password" });
            return;
        }
        res.render('homepage');

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;