const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('../../controllers/thoughtRoutes');

router.use('./users', userRoutes);
router.use('./thoughts', thoughtRoutes);