const { nanoid } = require("nanoid");

module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("FHF_USER_LOGIN", {
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
        reference_id: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        password_hashed: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        alternative_email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remember_me: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        activation_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    return Login;
}