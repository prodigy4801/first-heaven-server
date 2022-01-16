const db = require("../models");
const permissionInfo = db.permissions;
const Op = db.Sequelize.Op;

// Retrieve all permissionInfo from the database.
exports.findAll = (req, res) => {
    const form_url = req.query.form_url;
    var condition = form_url ? {
        form_url: {
             [Op.like]: `%${form_url}%`,
        },
    } : null;

    permissionInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving permissions.",
                isValid: false,
        });
    });
}

// Find a single permission with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    permissionInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving permission Record with id=" + id,
                isValid: false,
            })
        })
}