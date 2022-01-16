const { body } = require('express-validator');

exports.validate_farmDetails = () => {
    return [
        body('farm_name', 'Farm Name content missing').exists().isLength({ max: 100 }),
        body('farming_level').optional().isInt(),
        body('cultivating_items').exists().isLength({ max: 100 }),
        body('size_of_farmland_original').exists().isFloat(),
        body('size_of_farm_hectare').optional().isFloat(),
        body('area_cultivated_original').exists().isFloat(),
        body('area_cultivated_hectare').optional().isFloat(),
        body('area_uncultivated').optional().isFloat(),
        body('original_measure').optional().isLength({ max: 50 }),
        body('lease_duration_original').optional().isInt(),
        body('lease_duration_days').optional().isInt(),
        body('duration_measure_original').optional().isLength({ max: 50 }),
        body('lease_rate').optional().isFloat(),
        body('farmland_cost').optional().isDecimal()
    ]
}