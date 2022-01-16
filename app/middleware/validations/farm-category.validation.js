const { body } = require('express-validator');

exports.validate_category = () => {
    return [
        body('category_name', 'Category Name content missing').exists().isLength({ max: 50 })
    ]
}