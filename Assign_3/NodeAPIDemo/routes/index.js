var express = require('express'),
    router = express.Router(),
    restaurantController = require('../controllers/restaurantController');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

router.get('/', function (req, res, next) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/restaurants').post(restaurantController.store).get(restaurantController.index);

router.route('/restaurants/:_id').get(restaurantController.show).put(restaurantController.update)
    .delete(restaurantController.destroy);

module.exports = router;