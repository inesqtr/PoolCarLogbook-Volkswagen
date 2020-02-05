const express = require('express');
const router = express.Router();
const { getAllTrips } = require('../controllers/trip-controller');


/* GET home page */
router.get('/trips', getAllTrips);





module.exports = router;
