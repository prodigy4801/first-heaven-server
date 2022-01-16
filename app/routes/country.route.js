module.exports = (app) => {
    const countryController = require('../controllers/countries.controller');

    var router = require("express").Router();

    router.get('/', countryController.findAll);
    router.get('/:id', countryController.findOne);

    app.use('/api/countries', router);
}