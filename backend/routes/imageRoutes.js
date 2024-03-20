const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 
const path = require('path');

const { getImages, uploadImage, searchImagesByName, deleteImage } = require('../controllers/imageController');
const requireAuth = require('../middleware/requireAuth')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter }); 

const router = express.Router();
router.use(requireAuth);
router.get('/', getImages);
router.post('/', upload.single('image'), uploadImage);

router.post('/search', searchImagesByName);
router.delete('/:id', deleteImage);

module.exports = router;
