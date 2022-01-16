const { body } = require('express-validator');

exports.validate_product = () => {
    return [
        body('product_name', 'Product Name content missing').exists().isLength({ max: 100 }),
        body('unit_cost').optional().isDecimal(),
        body('category_id').exists().isInt(),
        body('activity_id').exists().isInt(),
        body('activity_item_id').exists().isInt(),
        body('created_by').optional().isLength({ max: 200 }),
        body('updated_by').optional().isLength({ max: 200 }),
    ]
}