const { nanoid } = require("nanoid");

module.exports = (sequelize, Sequelize) => {
    const Activity_Item = sequelize.define("FHF_ACTIVITY_ITEM", {
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
        item_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        unit_of_measure: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        unit_cost: {
            type: Sequelize.DECIMAL,
            defaultValue: 0
        },
        approval_type: { //0 - Pending, 1 - Approved, 2 - Denied
            type: Sequelize.INTEGER,
            defaultValue: 0
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

    return Activity_Item;
}