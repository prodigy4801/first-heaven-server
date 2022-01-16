module.exports = (app) => {
    const permissionController = require('../controllers/permissions.controller');

    var router = require("express").Router();

    router.get('/', permissionController.findAll);
    router.get('/:id', permissionController.findOne);

    app.use('/api/permissions', router);
}