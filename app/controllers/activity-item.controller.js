const db = require("../models");
const { validateResult } = require('express-validator/check');
const ActivityItemInfo = db.activity_items;
const Op = db.Sequelize.Op;

//Create and Save a new Activity Item
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate Activity Item by item_name and activity ID
        ActivityItemInfo.find({
            where: {
                item_name: req.body.item_name,
                activity_id: req.body.activity_id
            },
        }).then((activityItem) => {
            if (activityItem) {
                res.status(400).send({
                    message: "Failed! Activity Item already exist!",
                    isValid: false,
                })
                return;
            }

            const {activity_id, item_name, unit_of_measure, unit_cost, approval_type, created_by} = req.body;

            ActivityItemInfo.create({
                activity_id, item_name, unit_of_measure, unit_cost, approval_type, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Activity Item was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Activity Item.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all Farm activity from the database by activity name and category ID.
exports.findAll = (req, res) => {
    const item_name = req.query.item_name;
    const activity_id = req.query.activity_id;

    var condition1 = item_name ? {
        item_name: {
             [Op.like]: `%${item_name}%`,
        }
    } : null;

    var condition2 = activity_id ? {
        activity_id: {
             [Op.like]: `%${activity_id}%`,
        }
    } : null;

    ActivityItemInfo.findAll({ where: { condition1, condition2, delete_status: false }, include: ['activity'] }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Farm Activity.",
                isValid: false,
        });
    });
}

// Find a single Activity with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    ActivityItemInfo.findByPk({ where: { id: id, delete_status: false }, include: ['activity'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Farm Activity with id=${id}. Error Message ${err}`,
                isValid: false,
            })
        })
}

// Update a activity by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const {category_id, item_name, activity_level, updated_by} = req.body;

    ActivityItemInfo.update({ category_id, item_name, activity_level, updated_by }, 
        { 
            where: { id: id },
        }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Farm Activity was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Farm Activity with id=${id}. Maybe Farm Activity was not found or required parameter is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Farm Activity with id=" + id,
                isValid: false,
        });
    });
}

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    ActivityItemInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Farm Activity was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Farm Activity with id=${id}. Maybe Farm Activity was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Farm Activity with id=" + id,
            isValid: false,
        })
    })
}