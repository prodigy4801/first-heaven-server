const db = require("../models");
const { validateResult } = require('express-validator/check');
const ProductBrandInfo = db.product_brand;
const Op = db.Sequelize.Op;

//Create and Save a new Product
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate product
        ProductBrandInfo.findOne({
            where: {
                product_name: req.body.product_name,
            },
        }).then((product) => {
            if (product) {
                res.status(400).send({
                    message: "Failed! Product is already in use!",
                    isValid: false,
                })
                return;
            }

            const {product_name, unit_cost, category_id, activity_id, activity_item_id, created_by} = req.body;
            ProductBrandInfo.create({
                product_name, unit_cost, category_id, activity_id, activity_item_id, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Product was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Product Record.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all Product Brand from the database.
exports.findAll = (req, res) => {
    const product_name = req.query.product_name;
    var condition = product_name ? {
        product_name: {
             [Op.like]: `%${product_name}%`,
        },
    } : null;

    ProductBrandInfo.findAll({ where: condition, include: ['category', 'activity', 'activity_item']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Product.",
                isValid: false,
        });
    });
}

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    ProductBrandInfo.findByPk(id, { include: ['category', 'activity', 'activity_item'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Product Record with id=" + id,
                isValid: false,
            })
        })
}

// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const {product_name, unit_cost, category_id, activity_id, activity_item_id, created_by} = req.body;

    ProductBrandInfo.update({ product_name, unit_cost, category_id, activity_id, activity_item_id, created_by }, {
        where: { id: id },
    }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Product was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Product Record with id=${id}. Maybe Product Info was not found or req.body is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Product with id=" + id,
                isValid: false,
        });
    });
}

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    ProductBrandInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Product was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Product with id=" + id,
            isValid: false,
        })
    })
}