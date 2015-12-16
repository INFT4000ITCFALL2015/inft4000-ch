/**
 * Created by inet2005 on 12/13/15.
 */
console.log("In userController.js, top");

// Load required packages
var User = require('../models/User');

//**********************************************************************************************
// Create endpoint /api/users for GET
exports.index = function (req, res) {

    console.log("\n" + "In userController.js, index method...");

    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};//end of index()

//**********************************************************************************************
// Create endpoint /api/users for POST
exports.store = function (req, res) {

    console.log("\n" + "In userController.js, store method...");

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'New user added!'});
    });
};//end of store()
