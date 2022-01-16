module.exports = (sequelize, Sequelize) => {
    const LGA = sequelize.define("FHF_LGA", {
        lga_name: {
            type: Sequelize.STRING,
        },
    });

    return LGA;
}