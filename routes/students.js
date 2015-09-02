var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = require('path');


/* GET */
router.get('/', function(req, res, next) {
    var studentsArray = path.join(__dirname, '../models/students.json');
    fs.readFile(studentsArray, function (err, data) {
        res.send(JSON.parse(data));
    })

    /* POST */

    router.post('/', function (req, res, next) {
        console.log(req.body);
        var newfirstName = req.body.firstName;
        var newlastName = req.body.lastName;
        var file = path.join(__dirname, "../models/students.json");


        fs.readFile(file, "UTF-8", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var obj = JSON.parse(data);
            }
            obj.push({"firstName": newfirstName, "lastName": newlastName});

            fs.writeFile(file, JSON.stringify(obj), 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.sendStatus(200);
                }
            });
            res.send(obj);
        });

    });

});

    module.exports = router;