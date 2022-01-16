module.exports = (sequelize, Sequelize) => {
    const Role_Permission_Ref = sequelize.define("FHF_ROLE_PERMISSION_XREF", {
        parent_task: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });

    return Role_Permission_Ref;
}