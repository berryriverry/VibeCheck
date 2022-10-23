const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');

router.use('/users', userRoutes);

module.exports = router;