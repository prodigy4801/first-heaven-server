const db = require("../models");
const { validateResult } = require('express-validator/check');
const ActivityInfo = db.activity;
const Op = db.Sequelize.Op;

//Create and Save a new Activity
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate Activity by activity_name
        ActivityInfo.findOne({
            where: {
                activity_name: req.body.activity_name,
            },
        }).then((activity) => {
            if (activity) {
                res.status(400).send({
                    message: "Failed! Farm Activity already exist!",
                    isValid: false,
                })
                return;
            }

            const {category_id, activity_name, activity_level, created_by} = req.body;

            ActivityInfo.create({
                category_id, activity_name, activity_level, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Farm Activity was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Farm Activity.",
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
    const activity_name = req.query.activity_name;
    const category_id = req.query.category_id;

    var condition1 = activity_name ? {
        activity_name: {
             [Op.like]: `%${activity_name}%`,
        }
    } : null;

    var condition2 = category_id ? {
        category_id: {
             [Op.like]: `%${category_id}%`,
        }
    } : null;

    ActivityInfo.findAll({ where: { condition1, condition2, delete_status: false }, include: ['category'] }).then((data) => {
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

    ActivityInfo.findByPk({ where: { id: id, delete_status: false }, include: ['category'] })
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
    const {activity_name, activity_level, updated_by} = req.body;

    ActivityInfo.update({ activity_name, activity_level, updated_by }, 
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

    ActivityInfo.update({ delete_status: true },{
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