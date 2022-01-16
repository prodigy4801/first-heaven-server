module.exports = (app) => {
    const productBrandController = require('../controllers/product-brand.controller');
    const productBrandValidation = require('../middleware/validations/product-brand.validation');

    var router = require("express").Router();

    router.post('/create', productBrandValidation.validate_product(), productBrandController.create);
    router.get('/', productBrandController.findAll);
    router.get('/:id', productBrandController.findOne);
    router.put('/update/:id', productBrandValidation.validate_product(), productBrandController.update);
    router.delete('/delete/:id', productBrandController.delete);

    app.use('/api/product-brand', router)
}