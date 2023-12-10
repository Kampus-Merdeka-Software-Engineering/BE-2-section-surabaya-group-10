const prisma = require("../libs/prisma");
const imagekit = require("../libs/imagekit");

exports.findAll = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                images: true,
                facilities: true,
            }
        });
        res.status(200).json({ message: "Success", data: posts });
    } 
    }
}

exports.create = async (req, res) => {
    try {
        const { name, description, facilities, location, city, price, link } = req.body;
        const uploadedImages = [];
      
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded.' });
        }
      
        // Upload gambar ke ImageKit dan simpan URL gambar
        for (const file of req.files) {
          if (!file.buffer) {
            return res.status(400).json({ error: 'Invalid file format.' });
          }
      
          const uploadResponse = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
          });
      
          uploadedImages.push(uploadResponse.url);
        }

        // Convert the price to a Float
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedPrice)) {
          return res.status(400).json({ error: 'Invalid price format.' });
        }

        // Simpan data post ke database dengan URL gambar dan fasilitas
        const newPost = await prisma.post.create({
          data: {
            name,
            description,
            facilities: { create: facilities.map((facility) => ({ name: facility })) },
            location,
            city,
            price: parsedPrice,
            images: { create: uploadedImages.map(image => ({ url: image })) },
            link,
          },
        });
      
        res.json({ post: newPost });
    }});
    }      
}


exports.findOne = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                images: true,
                facilities: true,
            }
        });
  
      if (!post) {
        return res.status(404).send({
          message: `Post not found with id ${id}`,
        });
      }
  
      res.send(post);
    } 
      });
    }
};
  
exports.update = async (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: req.body,
        include: {
            images: true,
            facilities: true,
        }
      });
  
      if (!updatedPost) {
        return res.status(404).send({
          message: `Cannot update post with id=${id}. Maybe post was not found!`,
        });
      }
  
      res.send({ message: "Post was updated successfully." });
    } 
      });
    }
};
  
exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      const deletedPost = await prisma.post.delete({
        where: { id },
        include: {
            images: true,
            facilities: true,
        }
      });
  
      if (!deletedPost) {
        return res.status(404).send({
          message: `Cannot delete post with id=${id}. Maybe post was not found!`,
        });
      }
  
      res.send({ message: "Post was deleted successfully!" });
    } 
      });
    }
};

exports.findByCityAndName = async (req, res) => {
    const { query } = req.query;
    
    try {
        if (!query) {
          return res.status(400).json({ error: 'Parameter query is required.' });
        }
    
        const hotels = await prisma.post.findMany({
            where: {
              OR: [
                { name: { contains: query.toLowerCase() } },
                { city: { contains: query.toLowerCase() } },
              ],
            },
            include: {
              images: true,
              facilities: true,
            }});          
    
        res.json({ hotels });
      } 
      }
};
  
