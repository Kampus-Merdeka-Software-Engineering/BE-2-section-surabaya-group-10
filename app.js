const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

prisma.$connect()
    .then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    })

app.get("/", (req, res) => {
    res.send("Hello World!");
})

require('./src/routes/email.routes')(app)
require('./src/routes/post.routes')(app)
require('./src/routes/booking.routes')(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})