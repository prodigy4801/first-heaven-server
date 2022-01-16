const db = require("../models");
const { validateResult } = require('express-validator/check');
const BankDetailsInfo = db.bank_details;
const Op = db.Sequelize.Op;

//Create and Save a new Bank Details
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate bank details by user_id
        BankDetailsInfo.findOne({
            where: {
                user_id: req.body.user_id,
            },
        }).then((bankDetails) => {
            if (bankDetails) {
                res.status(400).send({
                    message: "Failed! Bank Details already exist!",
                    isValid: false,
                })
                return;
            }

            const {user_id, bank_id, account_number, account_name, created_by} = req.body;

            BankDetailsInfo.create({
                user_id, bank_id, account_number, account_name, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Bank Details was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Bank Details.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all Bank Details from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? {
        user_id: {
             [Op.like]: `%${user_id}%`,
        }
    } : null;

    BankDetailsInfo.findAll({ where: { condition, delete_status: false }, include: ['users', 'banks'] }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Bank Details.",
                isValid: false,
        });
    });
}

// Find a single Bank Details with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    BankDetailsInfo.findByPk({ where: { id: id, delete_status: false }, include: ['users', 'banks'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Bank Details with id=${id}. Error Message ${err}`,
                isValid: false,
            })
        })
}

// Find a single Bank Details by userId
exports.findByUserID = (req, res) => {
    const userID = req.params.user_id

    BankDetailsInfo.find({ where: { user_id: userID, delete_status: false }, include: ['users', 'banks'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Bank Details with id=${id}. Error Message ${err}`,
                isValid: false,
            })
        })
}

// Update a Bank Details by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const {bank_id, account_number, account_name, updated_by} = req.body;

    BankDetailsInfo.update({ bank_id, account_number, account_name, updated_by }, 
        { 
            where: { id: id },
        }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Bank Details was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Bank Details with id=${id}. Maybe Bank Details was not found or required parameter is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Bank Details with id=" + id,
                isValid: false,
        });
    });
}

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    BankDetailsInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Bank Details was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Bank Details with id=${id}. Maybe Bank Details was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Bank Details with id=" + id,
            isValid: false,
        })
    })
}