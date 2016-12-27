var express = require('express');
var router = express.Router();
var parser = require('ua-parser-js');
var _ = require('lodash');

/* GET a report of information pertaining to users who visit one of my sites */
router.get('/report', function(req, res) {
    var db = req.db;
    var collection = db.get('userInfoMetrics');
    collection.find({},{}, function(e, docs) {
        var browserInfo = _.reduce(docs, function(result, userInfo, key) {
            var browser = userInfo.userAgent.browser;

            if (!browser.name) {
                browser.name = 'UNKNOWN'
            }

            if (!browser.major) {
                browser.major = '';
            }

            if (_.isUndefined(result[browser.name + browser.major])) {
                result[browser.name + browser.major] = 1;
            } else {
                result[browser.name + browser.major]++;
            }

            return result;
        }, {});

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(browserInfo));
    });
});

/* POST information about a user so that I can store it in the DB */
router.post('/addUserInfo', function(req, res) {
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
        "pageLoadTime": pageLoadTime,
        "timestamp": new Date()
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