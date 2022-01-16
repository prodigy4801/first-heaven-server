module.exports = (sequelize, Sequelize) => {
    const States = sequelize.define("FHF_STATES", {
        state_name: {
            type: Sequelize.STRING(100),
        },
        abbreviation: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });

    return States;
}