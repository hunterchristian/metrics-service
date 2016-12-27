var express = require('express');
var router = express.Router();
var parser = require('ua-parser-js');

/* GET a report of information pertaining to users who visit one of my sites */
router.get('/metrics/report', function(req, res) {
    var db = req.db;
    var collection = db.get('userInfoMetrics');
    collection.find({},{},function(e,docs){
        res.render('userInfo', {
            "userlist" : docs
        });
    });
});

/* POST information about a user so that I can store it in the DB */
router.post('/metrics/addUserInfo', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    debugger;

    // Pull info out of request body
    var pageLoadTime = req.body.pageLoadTime;

    // Get user-agent header so that we can identify the browser used and other system info
    var ua = parser(req.headers['user-agent']);

    // Set our collection
    var collection = db.get('userInfoMetrics');

    // Submit to the DB
    collection.insert({
        "userAgent" : ua,
        "pageLoadTime": pageLoadTime
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
