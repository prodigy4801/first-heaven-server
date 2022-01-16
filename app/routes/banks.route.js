module.exports = (app) => {
    const bankController = require('../controllers/banks.controller');

    var router = require("express").Router();

    router.get('/', bankController.findAll);
    router.get('/:id', bankController.findOne);

    app.use('/api/banks', router);
}