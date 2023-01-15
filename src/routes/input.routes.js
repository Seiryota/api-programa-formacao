const { verifyToken } = require("../middlewares/auth");
const { create, get, getId, update, remove, getName, getDate, getMonth } = require("../controllers/input.controller");

exports.inputRoutes = (app) => {
    app.post("/input", verifyToken, create);
    app.get("/input", verifyToken, get);
    app.get("/input/:id", verifyToken, getId);
    app.put("/input/:id", verifyToken, update);
    app.delete("/input/:id", verifyToken, remove);
    app.get("/input/name/filter", verifyToken, getName);
    app.get("/input/date/filter", verifyToken, getDate);
    app.get("/input/month/filter/:id", verifyToken, getMonth);
};