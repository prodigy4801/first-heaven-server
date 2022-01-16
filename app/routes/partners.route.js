module.exports = (app) => {
    const partnerController = require('../controllers/partners.controller');
    const partnerValidation = require('../middleware/validations/partners.validation');

    var router = require("express").Router();

    router.post('/create', partnerValidation.validate_partners(), partnerController.create);
    router.get('/', partnerController.findAll);
    router.get('/:id', partnerController.findOne);
    router.put('/update/:id', partnerValidation.validate_partners(), partnerController.update);
    router.delete('/delete/:id', partnerController.delete);

    app.use('/api/partners', router)
}