module.exports = function (app) {
    const bookings = require("../controllers/booking.controller.js");
    const router = require("express").Router();

    router.post("/", bookings.createBooking);

    app.use("/api/bookings", router);
}