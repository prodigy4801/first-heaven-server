module.exports = (sequelize, Sequelize) => {
    const Permissions = sequelize.define("FHF_PERMISSIONS", {
        permission_description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        form_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });

    return Permissions;
}