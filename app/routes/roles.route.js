module.exports = (app) => {
    const roleController = require('../controllers/roles.controller');

    var router = require("express").Router();

    router.get('/', roleController.findAll);
    router.get('/:id', roleController.findOne);

    app.use('/api/roles', router);
}