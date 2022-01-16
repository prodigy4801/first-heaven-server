module.exports = (app) => {
    const activityController = require('../controllers/activity.controller');
    const activityValidation = require('../middleware/validations/activity.validation');

    var router = require("express").Router();

    router.post('/create', activityValidation.validate_activity(), activityController.create);
    router.get('/', activityController.findAll);
    router.get('/:id', activityController.findOne);
    router.put('/update/:id', activityValidation.validate_activity(), activityController.update);
    router.delete('/delete/:id', activityController.delete);

    app.use('/api/activity', router)
}