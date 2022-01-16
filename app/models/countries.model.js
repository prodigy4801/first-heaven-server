module.exports = (sequelize, Sequelize) => {
    const Countries = sequelize.define("FHF_COUNTRIES", {
        country_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        abbreviation: {
            type: Sequelize.STRING(5),
            allowNull: true,
        },
        phone_code: {
            type: Sequelize.STRING(5),
            allowNull: true,
        }
    });

    return Countries;
}