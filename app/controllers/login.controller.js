const db = require("../models");
var bcrypt = require("bcryptjs")
const { validateResult } = require('express-validator/check');
const loginInfo = db.login;
const Op = db.Sequelize.Op;

//Create and Save a new login
exports.create = (req, res, next) => {
    try{
        const errors = validateResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        //Check duplicate login by email and loginname
        loginInfo.findOne({
            where: {
                email: req.body.email,
            },
        }).then((login_user) => {
            if (login_user) {
                res.status(400).send({
                    message: "Failed! login email is already in use!",
                    isValid: false,
                })
                return;
            }
            const login_profile = {
                user_id: req.body.user_id,
                role_id: req.body.role_id,
                reference_id: req.body.reference_id,
                password_hashed: bcrypt.hashSync(req.body.password_hashed, 8),
                email: req.body.email,
                alternative_email: req.body.alternative_email,
                display_name: req.body.display_name,
                created_by: req.body.created_by,
            }
            //const {user_id, role_id, middle_name, last_name, email, phone_number, gender, date_of_birth, adress, city, state_origin_id, lga_origin_id, state_residence_id, login_country_id, picture_path, created_by} = req.body;
            loginInfo.create(login_profile)
                .then((data) => {
                    res.status(201).send({
                        message: "User Credentials was registered successfully!",
                        isValid: true,
                        data: data,
                    })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 
                        "Some error occurred while creating the login credential.",
                    isValid: false,
                })
            })
        })

        
    } catch (err){
        return next(err)
    }
}

// Retrieve all loginInfo from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? {
        email: {
             [Op.like]: `%${email}%`,
        },
    } : null;

    loginInfo.findAll({ where: condition, include: ['user', 'role']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving user logins.",
                isValid: false,
        });
    });
}

// Find a single login with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    loginInfo.findByPk(id, { include: ['user', 'role'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving user login Record with id=" + id,
                isValid: false,
            })
        })
}

// Update a loginInfo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validateResult(req);

    if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
    }
    
    const login_profile = {
        role_id: req.body.role_id,
        password_hashed: bcrypt.hashSync(req.body.password_hashed, 8),
        alternative_email: req.body.alternative_email,
        display_name: req.body.display_name,
        updated_by: req.body.updated_by,
    }

    loginInfo.update(login_profile, {
        where: { id: id },
    }).then((num) => {
            if (num == 1) {
                res.status(201).send({
                    message: "User Login was updated successfully.",
                    isValid: true,
                });
            } else {
                res.status(404).send({
                    message: `Cannot update User Login with id=${id}. Maybe login Profile was not found or req.body is empty!`,
                    isValid: false,
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating login with id=" + id,
                isValid: false,
        });
    });
}

// Delete a loginInfo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    loginInfo.update({ delete_status: true },{
            where: { id: id },
    }).then((num) => {
        if (num == 1) {
            res.status(202).send({
                message: "User Login was deleted successfully!",
                isValid: true,
            })
        } else {
            res.status(404).send({
                message: `Cannot delete User Login with id=${id}. Maybe login was not found!`,
                isValid: false,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete User Login with id=" + id,
            isValid: false,
        })
    })
}