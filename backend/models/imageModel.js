const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    user_id: {
        type: String,
        required: true
    },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
