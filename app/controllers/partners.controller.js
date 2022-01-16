const db = require("../models");
const { validateResult } = require('express-validator/check');
const partnerInfo = db.partners;
const Op = db.Sequelize.Op;

//Create and Save a new partner
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate partner by email and partnername
        partnerInfo.findOne({
            where: {
                email: req.body.email,
            },
        }).then((partner) => {
            if (partner) {
                res.status(400).send({
                    message: "Failed! Partner is already in use!",
                    isValid: false,
                })
                return;
            }

            const {company_name, full_name, email, phone_number, company_adress, city, residing_state_id, country_id, created_by} = req.body;
            partnerInfo.create({
                company_name, full_name, email, phone_number, company_adress, city, residing_state_id, country_id, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "Partner Information was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the Partner Record.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all partnerInfo from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? {
        email: {
             [Op.like]: `%${email}%`,
        },
    } : null;

    partnerInfo.findAll({ where: condition, include: ['state', 'country']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Partner Record.",
                isValid: false,
        });
    });
}

// Find a single partner with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    partnerInfo.findByPk(id, { include: ['state', 'country'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Partner Record with id=" + id,
                isValid: false,
            })
        })
}

// Update a partnerInfo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    const { company_name, full_name, phone_number, company_adress, city, residing_state_id, country_id, updated_by } = req.body;

    partnerInfo.update({ company_name, full_name, phone_number, company_adress, city, residing_state_id, country_id, updated_by }, {
        where: { id: id },
    }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "Partner Information was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Partner Record with id=${id}. Maybe Partner Profile was not found or req.body is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Partner record with id=" + id,
                isValid: false,
        });
    });
}

// Delete a partnerInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    partnerInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "Partner Record was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete Partner Record with id=${id}. Maybe Partner was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Partner with id=" + id,
            isValid: false,
        })
    })
}