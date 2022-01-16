const { body } = require('express-validator');

exports.validate_bankDetails = () => {
    return [
        body('user_id').exists().isInt(),
        body('bank_id').exists().isInt(),
        body('account_number').exists().isInt().isLength({ max: 12 }),
        body('account_name').optional().isLength({ max: 200})
    ]
}