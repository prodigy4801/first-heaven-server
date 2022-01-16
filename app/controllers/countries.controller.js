const db = require("../models");
const CountryInfo = db.countries;
const Op = db.Sequelize.Op;

// Retrieve all CountryInfo from the database.
exports.findAll = (req, res) => {
    const country_name = req.query.country_name;
    var condition = country_name ? {
        country_name: {
             [Op.like]: `%${country_name}%`,
        },
    } : null;

    CountryInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Countries.",
                isValid: false,
        });
    });
}

// Find a single Country with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    CountryInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Country Record with id=" + id,
                isValid: false,
            })
        })
}