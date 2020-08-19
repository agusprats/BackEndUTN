const express = require('express');
const  router = express.Router();
const user = require("../controllers/user");



router.post('/registro', user.registro);
router.post('/login', user.login);
router.delete('/:userId', user.deleteUser);


module.exports = router; 

