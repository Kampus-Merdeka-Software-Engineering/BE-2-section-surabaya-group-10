module.exports = function (app) {
    const email = require("../controllers/email.controller.js");
    const router = require("express").Router();

    router.post("/", email.create);

    app.use("/api/email", router);
}