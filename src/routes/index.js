const { userRoutes  } = require("./user.routes");
const { authRoutes } = require("./auth.routes");
const { inputRoutes } = require("./input.routes");
const { outputsRoutes } = require("./output.routes");
const { totalsRoutes } = require("./total.routes");

module.exports = (app) => {
    userRoutes(app);
    authRoutes(app);
    inputRoutes(app);
    outputsRoutes(app);
    totalsRoutes(app);
};

