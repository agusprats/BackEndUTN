const express = require('express');
const router = express.Router();


const app = 
require('./products');
require('./users');


/***   HOME PAGE   ***/
router.get('/', function(req, res, next) {
res.send('Bienvenidos');
});

module.exports = router;