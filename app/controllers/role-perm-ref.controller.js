const db = require("../models");
const rolePermRefInfo = db.role_perm_ref;
const Op = db.Sequelize.Op;

// Retrieve all role permission reference from the database.
exports.findAll = (req, res) => {
    const parent_task = req.query.parent_task;
    var condition = parent_task ? {
        parent_task: {
             [Op.like]: `%${parent_task}%`,
        },
    } : null;

    rolePermRefInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving role permsion linking.",
                isValid: false,
        });
    });
}

// Find a single role permission reference with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    rolePermRefInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving role permission reference Record with id=" + id,
                isValid: false,
            })
        })
}