const express = require('express');
const router = express.Router();
const { getAllTrips, 
        createTrip, 
        editTrip, 
        deleteTrip 
    } = require('../controllers/trip-controller');


/* GET home page */
router.get('/trips', getAllTrips);
router.post('/trip/create', createTrip);
router.put('/trip/edit', editTrip);
router.delete('/trip/delete', deleteTrip);

module.exports = router;
