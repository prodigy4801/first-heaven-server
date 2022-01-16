const { nanoid } = require("nanoid");

module.exports = (sequelize, Sequelize) => {
    const Farm_Category = sequelize.define("FHF_FARMING_CATEGORY", {
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
        category_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        category_description: {
            type: Sequelize.STRING,
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

    return Farm_Category;
}