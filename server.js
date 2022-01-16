const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./apidoc.yaml')
//const expressValidator = require('express-validator')
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

var corsOptions = {
    origin: "http://localhost:4040",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
//app.use(expressValidator());

const db = require("./app/models");

//For Production
// db.sequelize.sync()

//For development
db.sequelize.sync({ force: true }).then(() => {
    try {
        console.log("Drop and re-sync db.")
    } catch {}
    //initial()
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to First Heaven Farms Backend Service." })
});

require("./app/routes/activity-item.route")(app);
require("./app/routes/activity.route")(app);
require("./app/routes/bank-details.route")(app);
require("./app/routes/banks.route")(app);
require("./app/routes/country.route")(app);
require("./app/routes/farm-category.route")(app);
require("./app/routes/farm-details.route")(app);
require("./app/routes/lga.route")(app);
require("./app/routes/login.route")(app);
require("./app/routes/partners.route")(app);
require("./app/routes/permissions.route")(app);
require("./app/routes/product-brand.route")(app);
require("./app/routes/role-perm-ref.route")(app);
require("./app/routes/roles.route")(app);
require("./app/routes/states.route")(app);
require("./app/routes/users.route")(app);

const PORT = process.env.PORT || '5050';
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
