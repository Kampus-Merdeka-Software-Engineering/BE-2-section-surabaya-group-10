const prisma = require("../libs/prisma");

exports.create = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExists = await prisma.email.findUnique({
            where: {
                email: email
            }
        });
        if (!emailExists) {
            const newEmail = await prisma.email.create({
                data: {
                    email: email
                }
            });
            res.status(201).json({ message: "Email subscribe success", data: newEmail });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating email" });
    }
}