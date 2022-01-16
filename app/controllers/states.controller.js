const db = require("../models");
const StateInfo = db.states;
const Op = db.Sequelize.Op;

// Retrieve all StateInfo from the database.
exports.findAll = (req, res) => {
    const state_name = req.query.state_name;
    var condition = state_name ? {
        state_name: {
             [Op.like]: `%${state_name}%`,
        },
    } : null;

    StateInfo.findAll({ where: condition}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving States.",
                isValid: false,
        });
    });
}

// Find a single State with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    StateInfo.findByPk(id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving State Record with id=" + id,
                isValid: false,
            })
        })
}