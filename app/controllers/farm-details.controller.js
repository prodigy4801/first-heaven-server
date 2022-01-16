const db = require("../models");
const { validateResult } = require('express-validator/check');
const FarmDetailsInfo = db.farm_details;
const Op = db.Sequelize.Op;

//Create and Save a new Farm
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate farm by farm_name and category_id
        FarmDetailsInfo.findOne({
            where: {
                farm_name: req.body.farm_name,
                category_id: req.body.category_id
            },
        }).then((farm) => {
            if (farm) {
                res.status(400).send({
                    message: "Failed! Farm Information already exist!",
                    isValid: false,
                })
                return;
            }

            const {category_id, residing_state_id, residing_lga_id, user_farm_manager_id, user_supervisor_id, 
                partner_id, farm_name, farming_level, cultivating_items, plot_number, farmland_address, 
                size_of_farmland_original, size_of_farm_hectare, area_cultivated_original, area_cultivated_hectare, 
                area_uncultivated, original_measure, lease_duration_original, lease_duration_days, duration_measure_original,
                lease_rate, farmland_cost, commencement_date, created_by} = req.body;

            FarmDetailsInfo.create({
                category_id, residing_state_id, residing_lga_id, user_farm_manager_id, user_supervisor_id, 
                partner_id, farm_name, farming_level, cultivating_items, plot_number, farmland_address, 
                size_of_farmland_original, size_of_farm_hectare, area_cultivated_original, area_cultivated_hectare, 
                area_uncultivated, original_measure, lease_duration_original, lease_duration_days, duration_measure_original,
                lease_rate, farmland_cost, commencement_date, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Farm Information was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Farm Record.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all FarmInfo from the database.
exports.findAll = (req, res) => {
    const farm_name = req.query.farm_name;
    var condition = farm_name ? {
        farm_name: {
             [Op.like]: `%${farm_name}%`,
        }
    } : null;

    FarmDetailsInfo.findAll({ where: {condition, delete_status: false}, include: ['category', 'state', 'lga', 'user_farmManager', 'user_supervisor', 'partner']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Farm Details.",
                isValid: false,
        });
    });
}

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    FarmDetailsInfo.findByPk({ where: {id: id, delete_status: false }, include: ['category', 'state', 'lga', 'user_farmManager', 'user_supervisor', 'partner'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Farm Details with id=${id}. Error Message ${err}`,
                isValid: false,
            })
        })
}

// Update a UserInfo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const {residing_state_id, residing_lga_id, user_farm_manager_id, user_supervisor_id, 
                partner_id, farming_level, cultivating_items, plot_number, farmland_address, 
                size_of_farmland_original, size_of_farm_hectare, area_cultivated_original, area_cultivated_hectare, 
                area_uncultivated, original_measure, lease_duration_original, lease_duration_days, duration_measure_original,
                lease_rate, farmland_cost, commencement_date, updated_by} = req.body;

    UserInfo.update({ residing_state_id, residing_lga_id, user_farm_manager_id, user_supervisor_id, 
        partner_id, farming_level, cultivating_items, plot_number, farmland_address, 
        size_of_farmland_original, size_of_farm_hectare, area_cultivated_original, area_cultivated_hectare, 
        area_uncultivated, original_measure, lease_duration_original, lease_duration_days, duration_measure_original,
        lease_rate, farmland_cost, commencement_date, updated_by }, 
        { 
            where: { id: id },
        }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Farm Record was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Farm Record with id=${id}. Maybe Farm Record was not found or required parameter is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Farm Record with id=" + id,
                isValid: false,
        });
    });
}

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    FarmDetailsInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Farm Record was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Farm Record with id=${id}. Maybe Farm was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Farm with id=" + id,
            isValid: false,
        })
    })
}