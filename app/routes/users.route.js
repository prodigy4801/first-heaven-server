module.exports = (app) => {
    const userController = require('../controllers/users.controller');
    const userValidation = require('../middleware/validations/users.validation');

    var router = require("express").Router();

    router.post('/create', userValidation.validate_users(), userController.create);
    router.get('/', userController.findAll);
    router.get('/:id', userController.findOne);
    router.put('/update/:id', userValidation.validate_users(), userController.update);
    router.delete('/delete/:id', userController.delete);

    app.use('/api/users', router)
}