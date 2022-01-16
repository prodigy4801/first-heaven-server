const { body } = require('express-validator');

exports.validate_activityItem = () => {
    return [
        body('activity_id').exists().isInt(),
        body('item_name').exists().isLength({ max: 100 }),
        body('unit_of_measure').optional().isLength({ max: 50}),
        body('unit_cost').optional().isDecimal()
    ]
}