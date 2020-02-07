const express = require('express');
const router = express.Router();
const { getAllTrips, 
        createTrip, 
        editTrip, 
        deleteTrip,
        getAggregatedKmMonth 
    } = require('../controllers/trip-controller');


/* GET home page */
router.get('/trips', getAllTrips);
router.post('/trip/create', createTrip);
router.put('/trip/edit', editTrip);
router.delete('/trip/delete', deleteTrip);
router.get('/trip/kmmonth', getAggregatedKmMonth);

module.exports = router;
