const db = require("../models");
const LGAInfo = db.lga;
const Op = db.Sequelize.Op;

// Retrieve all LGAInfo from the database.
exports.findAll = (req, res) => {
    const lga_name = req.query.lga_name;
    var condition = lga_name ? {
        lga_name: {
             [Op.like]: `%${lga_name}%`,
        },
    } : null;

    LGAInfo.findAll({ where: condition, include: ['state']}).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
                message: err.message || "Some error occurred while retrieving Local Govt.",
                isValid: false,
        });
    });
}

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    LGAInfo.findByPk(id, { include: ['state'] })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Local Govt Record with id=" + id,
                isValid: false,
            })
        })
}