module.exports = (app) => {
    const activityItemController = require('../controllers/activity-item.controller');
    const activityItemValidation = require('../middleware/validations/activity-item.validation');

    var router = require("express").Router();

    router.post('/create', activityItemValidation.validate_activityItem(), activityItemController.create);
    router.get('/', activityItemController.findAll);
    router.get('/:id', activityItemController.findOne);
    router.put('/update/:id', activityItemValidation.validate_activityItem(), activityItemController.update);
    router.delete('/delete/:id', activityItemController.delete);

    app.use('/api/activity-item', router)
}