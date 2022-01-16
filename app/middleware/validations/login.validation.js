const { body } = require('express-validator');

exports.validate_login = () => {
    return [
        body('reference_id').optional().isLength({ max: 15 }),
        body('password_hashed').optional().isLength({ max: 50 }),
        body('email').exists().isEmail().isLength({ max: 255 }),
        body('alternative_email').exists().isEmail().isLength({ max: 255 })
    ]
}