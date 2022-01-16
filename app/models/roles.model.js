module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("FHF_ROLES", {
        role_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        pswd_life_days: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });

    return Roles;
}