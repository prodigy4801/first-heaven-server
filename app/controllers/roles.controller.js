const db = require("../models");
const roleInfo = db.roles;
const Op = db.Sequelize.Op;

// Retrieve all roleInfo from the database.
exports.findAll = (req, res) => {
    const role_name = req.query.role_name;
    var condition = role_name ? {
        role_name: {
             [Op.like]: `%${role_name}%`,
        },
    } : null;

    roleInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles.",
                isValid: false,
        });
    });
}

// Find a single role with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    roleInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving role Record with id=" + id,
                isValid: false,
            })
        })
}