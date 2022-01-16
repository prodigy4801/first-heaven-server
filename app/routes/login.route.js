module.exports = (app) => {
    const loginController = require('../controllers/login.controller');
    const loginValidation = require('../middleware/validations/login.validation');

    var router = require("express").Router();

    router.post('/create', loginValidation.validate_login(), loginController.create);
    router.get('/', loginController.findAll);
    router.get('/:id', loginController.findOne);
    router.put('/update/:id', loginValidation.validate_login(), loginController.update);
    router.delete('/delete/:id', loginController.delete);

    app.use('/api/login', router)
}