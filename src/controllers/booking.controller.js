const prisma = require("../libs/prisma");

exports.createBooking = async (req, res) => {
    const { postId, checkIn, checkOut, roomType, guests, price } = req.body;
    const id = parseInt(postId);
    try {
      // Cek ketersediaan post berdasarkan postId
      const post = await prisma.post.findUnique({
        where: { id: id },
      });
  
      if (!post) {
        return res.status(404).send({
          message: `Post not found with id ${postId}`,
        });
      }
  
      // Buat booking baru
      const newBooking = await prisma.booking.create({
        data: {
          postId: id,
          checkIn,
          checkOut,
          roomType,
          guests: parseInt(guests),
          price: parseFloat(price),
        },
      });
      
      res.status(201).send(newBooking);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error creating booking",
      });
    }
};
  