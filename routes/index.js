var express = require('express');
var router = express.Router();

/* POST information about a user so that I can store it in the DB */
router.get('/', function(req, res) {
    res.send("Welcome to my metric service! You'll have to take a look at the project to determine what route you need to be hitting.");
});

module.exports = router;