const express = require('express');
const router = express.Router();
const { showHomepage } = require('../controllers/page-controller');
const { } = require('../controllers/project-controller');




/* GET home page */
router.get('/', showHomepage);




module.exports = router;
