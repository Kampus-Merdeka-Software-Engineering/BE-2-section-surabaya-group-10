const Imagekit = require('imagekit');

module.exports = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// n2h2n3eu7
// https://ik.imagekit.io/n2h2n3eu7/path/to/myimage.jpg
// https://imagekit.io/dashboard/url-endpoints/lksjdf7sd
// https://ik.imagekit.io/n2h2n3eu7
// https://imagekit.io/dashboard/url-endpoints/lksjdf7sd