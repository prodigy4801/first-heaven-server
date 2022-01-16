const { nanoid } = require("nanoid");

module.exports = (sequelize, Sequelize) => {
    const FarmDetails = sequelize.define("FHF_FARM_DETAILS", {
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
        farm_name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        farming_level: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cultivating_items: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        plot_number: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        farmland_address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        size_of_farmland_original: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        size_of_farm_hectare: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        area_cultivated_original: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        area_cultivated_hectare: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        area_uncultivated: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        original_measure: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        lease_duration_original: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        lease_duration_days: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        duration_measure_original: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        lease_rate: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        farmland_cost: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        commencement_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        created_by: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        delete_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    return FarmDetails;
}