module.exports = (app) => {
    const farmDetailsController = require('../controllers/farm-details.controller');
    const farmDetailsValidation = require('../middleware/validations/farm-details.validation');

    var router = require("express").Router();

    router.post('/create', farmDetailsValidation.validate_farmDetails(), farmDetailsController.create);
    router.get('/', farmDetailsController.findAll);
    router.get('/:id', farmDetailsController.findOne);
    router.put('/update/:id', farmDetailsValidation.validate_farmDetails(), farmDetailsController.update);
    router.delete('/delete/:id', farmDetailsController.delete);

    app.use('/api/farm-details', router)
}