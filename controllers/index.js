const router = require('express').Router();
const feederRoutes = require('./feederRoutes');

router.use('/',feederRoutes);

module.exports = router;