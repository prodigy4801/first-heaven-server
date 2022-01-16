const { body } = require('express-validator');

exports.validate_partners = () => {
    return [
        body('company_name').exists(),
        body('full_name').exists(),
        body('email').exists().isEmail().isLength({ max: 255 }),
        body('phone_number').optional().isLength({ max: 50 }),
        body('city').optional().isLength({ max: 100 }),
    ]
}