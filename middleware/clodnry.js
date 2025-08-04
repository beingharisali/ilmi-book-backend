// middleware/cloudinaryStorage.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../database/cloudnry');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products', // Optional Cloudinary folder name
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
    },
});

const upload = multer({ storage });

module.exports = upload;
