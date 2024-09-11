const Author = require('../models/Author');
const {authorSchema} = require('../config/validations');


const addAuthor = async (req, res) => {
    const { name, biography } = req.body;
    const { error } = authorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const newAuthor = new Author({ name, biography });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({message: 'Author not found'});
        }
        res.status(200).json(author);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};



const updateAuthor = async (req, res) => {
    const { name, biography } = req.body;

    const { error } = authorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const authorExists = await Author.findById(req.params.id);
        if (!authorExists) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            { name, biography },
            { new: true }
        );

        res.status(200).json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({message: 'Author not found'});
        }
        res.status(200).json({message: 'Author deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    addAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
