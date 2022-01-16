module.exports = (app) => {
    const farmCategoryController = require('../controllers/farm-category.controller');
    const farmCategoryValidation = require('../middleware/validations/farm-category.validation');

    var router = require("express").Router();

    router.post('/create', farmCategoryValidation.validate_category(), farmCategoryController.create);
    router.get('/', farmCategoryController.findAll);
    router.get('/:id', farmCategoryController.findOne);
    router.put('/update/:id', farmCategoryValidation.validate_category(), farmCategoryController.update);
    router.delete('/delete/:id', farmCategoryController.delete);

    app.use('/api/farm-category', router)
}