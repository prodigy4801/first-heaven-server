module.exports = (app) => {
    const bankDetailsController = require('../controllers/bank-details.controller');
    const bankDetailsValidation = require('../middleware/validations/bank-details.validation');

    var router = require("express").Router();

    router.post('/create', bankDetailsValidation.validate_bankDetails(), bankDetailsController.create);
    router.get('/', bankDetailsController.findAll);
    router.get('/:id', bankDetailsController.findOne);
    router.put('/update/:id', bankDetailsValidation.validate_bankDetails(), bankDetailsController.update);
    router.delete('/delete/:id', bankDetailsController.delete);

    app.use('/api/bank-details', router)
}