module.exports = (app) => {
    const lgaController = require('../controllers/lga.controller');

    var router = require("express").Router();

    router.get('/', lgaController.findAll);
    router.get('/:id', lgaController.findOne);

    app.use('/api/lga', router)
}