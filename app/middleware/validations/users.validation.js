const { body } = require('express-validator');

exports.validate_users = () => {
    return [
        body('first_name', 'First Name content missing').exists().isLength({ max: 100 }),
        body('last_name', 'Last Name content missing').exists().isLength({ max: 100 }),
        body('middle_name').optional().isLength({ max: 100 }),
        body('email').exists().isEmail().isLength({ max: 200 }),
        body('phone_number').optional().isLength({ max: 50 }),
        body('gender').optional().isIn(['Male', 'Female']).isLength({ max: 10 }),
        body('city').optional().isLength({ max: 100 }),
    ]
}