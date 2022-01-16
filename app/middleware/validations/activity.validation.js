const { body } = require('express-validator');

exports.validate_activity = () => {
    return [
        body('category_id').exists().isInt(),
        body('activity_name').exists().isInt().isLength({ max: 12 }),
        body('activity_level').exists().isInt()
    ]
}