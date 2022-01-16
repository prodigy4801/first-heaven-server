module.exports = (sequelize, Sequelize) => {
    const Banks = sequelize.define("FHF_BANKS", {
        bank_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        sort_code: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
    });

    return Banks;
}