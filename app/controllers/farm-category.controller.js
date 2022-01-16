const db = require("../models");
const { validateResult } = require('express-validator/check');
const CategoryInfo = db.farm_category;
const Op = db.Sequelize.Op;

//Create and Save a new Farm category
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate category by category_name
        CategoryInfo.findOne({
            where: {
                category_name: req.body.category_name,
            },
        }).then((category) => {
            if (category) {
                res.status(400).send({
                    message: "Failed! Farm Category already exist!",
                    isValid: false,
                })
                return;
            }

            const {category_name, category_description, created_by} = req.body;

            CategoryInfo.create({
                category_name, category_description, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Farm Category was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Farm Category.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all Farm Category from the database.
exports.findAll = (req, res) => {
    const category_name = req.query.category_name;
    var condition = category_name ? {
        category_name: {
             [Op.like]: `%${category_name}%`,
        }
    } : null;

    CategoryInfo.findAll({ where: { condition, delete_status: false } }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Farm Category.",
                isValid: false,
        });
    });
}

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    CategoryInfo.findByPk({ where: { id: id, delete_status: false } })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Farm Category with id=${id}. Error Message ${err}`,
                isValid: false,
            })
        })
}

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const {category_name, category_description, updated_by} = req.body;

    CategoryInfo.update({ category_name, category_description, updated_by }, 
        { 
            where: { id: id },
        }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Farm Category was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Farm Category with id=${id}. Maybe Farm category was not found or required parameter is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Farm Category with id=" + id,
                isValid: false,
        });
    });
}

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    CategoryInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Farm Category was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Farm Category with id=${id}. Maybe Farm Category was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Farm Category with id=" + id,
            isValid: false,
        })
    })
}