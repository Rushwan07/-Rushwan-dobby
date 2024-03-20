const Image = require('../models/imageModel');
const mongoose = require('mongoose')




const getImages = async (req, res) => {
    const user_id = req.user._id
    const images = await Image.find({user_id}).sort({ createdAt: -1 });
    // Replace backslashes with forward slashes in image paths
    const formattedImages = images.map(image => ({
        ...image.toObject(),
        image: image.image.replace(/\\/g, '/')
    }));
    res.status(200).json(formattedImages);
};


const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { name, desc } = req.body;
        const user_id = req.user._id
        const newImage = await Image.create({ name, image: req.file.path , desc, user_id });
        // const newImage = new Image({
        //     user_id,
        //     name,
        //     desc,
        //     image: req.file.path 
        // });
     
        // await newImage.save();
        return res.status(200).json({ message: 'Image uploaded successfully', image: newImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).send('Server error');
    }
};

const searchImagesByName = async (req, res) => {
    try {
        const { search } = req.body;
        const user_id = req.user._id
        if (!search) {
            return res.status(400).json({ error: 'Search parameter is required' });
        }

        const images = await Image.find({ name: { $regex: new RegExp(search, 'i') }, user_id });

        if (images.length === 0) {
            return res.status(404).json({ message: 'No images found with the provided name' });
        }

        res.status(200).json(images);
    } catch (error) {
        console.error('Error searching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




const deleteImage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such image' })
    }

    const image = await Image.findOneAndDelete({ _id: id })

    if (!image) {
        return res.status(400).json({ error: 'No such Image' })
    }

    res.status(200).json(image)
}



module.exports = {
    getImages,
    uploadImage,
    searchImagesByName,
    deleteImage

}