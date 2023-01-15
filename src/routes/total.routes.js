const { verifyToken } = require("../middlewares/auth");
const { getTotals } = require("../controllers/total.controller");

exports.totalsRoutes = (app) => {
    app.get("/totals/month", verifyToken, getTotals);
};