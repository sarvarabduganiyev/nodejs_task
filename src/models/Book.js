const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    publishedYear: { type: Number },
    summary: { type: String },
});

module.exports = mongoose.model('Book', BookSchema);
