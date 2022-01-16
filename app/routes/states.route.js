module.exports = (app) => {
    const stateController = require('../controllers/states.controller');

    var router = require("express").Router();

    router.get('/', stateController.findAll);
    router.get('/:id', stateController.findOne);

    app.use('/api/states', router);
}