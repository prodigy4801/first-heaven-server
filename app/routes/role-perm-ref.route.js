module.exports = (app) => {
    const rolePermissionRefController = require('../controllers/role-perm-ref.controller');

    var router = require("express").Router();

    router.get('/', rolePermissionRefController.findAll);
    router.get('/:id', rolePermissionRefController.findOne);

    app.use('/api/role-permission-ref', router);
}