const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const { STRING } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
    
db.activity_items = require("./activity-items.model")(sequelize, Sequelize);
db.activity = require("./activity.model")(sequelize, Sequelize);
db.bank_details = require("./bank-details.model")(sequelize, Sequelize);
db.banks = require("./banks.model")(sequelize, Sequelize);
db.countries = require("./countries.model")(sequelize, Sequelize);
db.farm_category = require("./farm-category.model")(sequelize, Sequelize);
db.farm_details = require("./farm-details.model")(sequelize, Sequelize);
db.lga = require("./lga.model")(sequelize, Sequelize);
db.login = require("./login.model")(sequelize, Sequelize);
db.partners = require("./partners.model")(sequelize, Sequelize);
db.permissions = require("./permissions.model")(sequelize, Sequelize);
db.product_brand = require("./product-brand.model")(sequelize, Sequelize);
db.role_perm_ref = require("./role-perm-ref.model")(sequelize, Sequelize);
db.roles = require("./roles.model")(sequelize, Sequelize);
db.states = require("./states.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);

db.lga.belongsTo(db.states, {
    foreignKey: {
        name: "state_id",
        allowNull: false,
    },
    as: "state"
});

db.users.belongsTo(db.states, {
    foreignKey: "state_origin_id",
    as: "state"
});

db.users.belongsTo(db.states, {
    foreignKey: "state_residence_id",
    as: "state_residence"
});

db.users.belongsTo(db.lga, {
    foreignKey: "lga_origin_id",
    as: "lga"
});

db.users.belongsTo(db.countries, {
    foreignKey: "user_country_id",
    as: "country"
});

db.role_perm_ref.belongsTo(db.roles, {
    foreignKey: {
        name: "role_id",
        allowNull: false,
    },
    as: "role"
});

db.role_perm_ref.belongsTo(db.permissions, {
    foreignKey: {
        name: "permission_id",
        allowNull: false
    },
    as: "permission"
});

db.product_brand.belongsTo(db.farm_category, {
    foreignKey: {
        name: "category_id",
        allowNull: false,
        type: STRING,
    },
    as: "category"
});

db.product_brand.belongsTo(db.activity, {
    foreignKey: {
        name: "activity_id",
        allowNull: false,
        type: STRING,
    },
    as: "activity"
});

db.product_brand.belongsTo(db.activity_items, {
    foreignKey: {
        name: "activity_item_id",
        allowNull: false,
        type: STRING,
    },
    as: "activity_item"
});

db.partners.belongsTo(db.states, {
    foreignKey: "residing_state_id",
    as: "state"
});

db.partners.belongsTo(db.countries, {
    foreignKey: "country_id",
    as: "country",
});

db.login.belongsTo(db.users, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
        type: STRING,
    },
    as: "user"
});

db.login.belongsTo(db.roles, {
    foreignKey: {
        name: "role_id",
        defaultValue: 0
    },
    as: "role"
});

db.farm_details.belongsTo(db.farm_category, {
    foreignKey: {
        name: "category_id",
        allowNull: false,
        type: STRING,
    },
    as: "category"
});

db.farm_details.belongsTo(db.states, {
    foreignKey: "residing_state_id",
    as: "state"
});

db.farm_details.belongsTo(db.lga, {
    foreignKey: "residing_lga_id",
    as: "lga"
});

db.farm_details.belongsTo(db.users, {
    foreignKey: {
        name: "user_farm_manager_id",
        type: STRING,
    },
    as: "user_farmManager",
});

db.farm_details.belongsTo(db.users, {
    foreignKey: {
        name: "user_supervisor_id",
        type: STRING,
    },
    as: "user_supervisor"
});

db.farm_details.belongsTo(db.partners, {
    foreignKey: {
        name: "partner_id",
        type: STRING,
    },
    as: "partner"
});

db.activity.belongsTo(db.farm_category, {
    foreignKey: {
        name: "category_id",
        allowNull: false,
        type: STRING,
    },
    as: "category"
});

db.bank_details.belongsTo(db.users, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
        type: STRING,
    },
    as: "users"
});

db.bank_details.belongsTo(db.banks, {
    foreignKey: {
        name: "bank_id",
        allowNull: false
    },
    as: "banks"
});

db.activity_items.belongsTo(db.activity, {
    foreignKey: {
        name: "activity_id",
        allowNull: false,
        type: STRING,
    },
    as: "activity"
});

module.exports = db