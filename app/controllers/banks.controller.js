const db = require("../models");
const BankInfo = db.banks;
const Op = db.Sequelize.Op;

// Retrieve all BankInfo from the database.
exports.findAll = (req, res) => {
    const bank_name = req.query.bank_name;
    var condition = bank_name ? {
        bank_name: {
             [Op.like]: `%${bank_name}%`,
        },
    } : null;

    BankInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Banks.",
                isValid: false,
        });
    });
}

// Find a single Bank with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    BankInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Bank Record with id=" + id,
                isValid: false,
            })
        })
}