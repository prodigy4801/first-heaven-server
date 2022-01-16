const db = require("../models");
const { validateResult } = require('express-validator/check');
const UserInfo = db.users;
const Op = db.Sequelize.Op;

//Create and Save a new User
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate user by email and username
        UserInfo.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Username is already in use!",
                    isValid: false,
                })
                return;
            }

            const {first_name, middle_name, last_name, email, phone_number, gender, date_of_birth, adress, city, state_origin_id, lga_origin_id, state_residence_id, user_country_id, picture_path, created_by} = req.body;
            UserInfo.create({
                first_name, middle_name, last_name, email, phone_number, gender, date_of_birth, adress, city, state_origin_id, lga_origin_id, state_residence_id, user_country_id, picture_path, created_by
            }).then((data) => {
                res.status(201).send({
                        message: "User was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the User Record.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all UserInfo from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? {
        email: {
             [Op.like]: `%${email}%`,
        },
    } : null;

    UserInfo.findAll({ where: condition, include: ['state', 'state_residence', 'lga', 'country']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users.",
                isValid: false,
        });
    });
}

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    UserInfo.findByPk(id, { include: ['state', 'state_residence', 'lga', 'country'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving User Record with id=" + id,
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
    const {first_name, middle_name, last_name, phone_number, gender, date_of_birth, adress, city, state_origin_id, lga_origin_id, state_residence_id, user_country_id, picture_path, updated_by} = req.body;

    UserInfo.update({ first_name, middle_name, last_name, phone_number, gender, date_of_birth, adress, city, state_origin_id, lga_origin_id, state_residence_id, user_country_id, picture_path, updated_by }, {
        where: { id: id },
    }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "User was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update User Record with id=${id}. Maybe User Profile was not found or req.body is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
                isValid: false,
        });
    });
}

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    UserInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "User was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete User with id=" + id,
            isValid: false,
        })
    })
}