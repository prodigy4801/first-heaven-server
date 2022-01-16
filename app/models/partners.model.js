const { nanoid } = require("nanoid");

module.exports = (sequelize, Sequelize) => {
    const Partners = sequelize.define("FHF_PARTNERS", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: () => {
                const randomID = nanoid(12);
                return randomID;
            }
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        company_adress: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        delete_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        created_by: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)"),
            field: "date_created",
        },
        updated_by: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal(
                "CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"
            ),
            field: "date_updated",
        },
    });

    return Partners;
}