var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test/restaurants');

var Restaurant = require('../models/Restaurant'),
    perPage = 2500,
    currentPage = 0;

//var nextPage = function () {
//    if ($scope.currentPage < 0) {
//        $scope.currentPage += 1;
//    }
//};
//
//var prevPage = function () {
//    if ($scope.currentPage > 0) {
//        $scope.currentPage -= 1;
//    }
//};

module.exports.index = function (req, res) {
    Restaurant.find().skip(currentPage).limit(perPage).sort({_id: -1}).exec(function (err, restaurants) {
        if (err)
            res.send(err);
        res.json(restaurants);
    });
};

module.exports.store = function (req, res) {
    var restaurant = new Restaurant();

    restaurant.borough = req.body.borough;
    restaurant.cuisine = req.body.cuisine;
    restaurant.name = req.body.name;
    restaurant.restaurant_id = req.body.restaurant_id;
    restaurant.grades.push({date: req.body.date, grade: req.body.grade, score: req.body.score});
    restaurant.address.push({building: req.body.building, street: req.body.street, zipcode: req.body.zipcode});
    restaurant.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: 'Restaurant created!'});
    });
};

module.exports.show = function (req, res) {
    Restaurant.findById(req.params._id, function (err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
};

module.exports.update = function (req, res) {
    Restaurant.findById(req.params._id, function (err, restaurant) {
        if (err)
            res.send(err);
        restaurant.borough = req.body.borough;
        restaurant.cuisine = req.body.cuisine;
        restaurant.name = req.body.name;
        restaurant.restaurant_id = req.body.restaurant_id;
        restaurant.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Restaurant updated!'});
        });
    });
};

module.exports.destroy = function (req, res) {
    Restaurant.remove({_id: req.params._id}, function (err, restaurant) {
        if (err)
            res.send(err);
        res.json({message: 'Restaurant deleted!'});
    });
};

module.exports.search = function (req, res) {
    Restaurant.findById(req.params.borough, function (err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
};