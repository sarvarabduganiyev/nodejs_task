const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const {bookSchema} = require('../config/validations');


const getBooks = async (req, res) => {
    try {
        const { title, author, category, sortBy = 'title', sortOrder = 'asc', page = 1, limit = 10 } = req.query;

        const filter = {};

        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }

        if (author) {
            filter.author = author;
        }

        if (category) {
            filter.category = category;
        }

        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const books = await Book.find(filter)
            .populate('author')
            .populate('category')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const addBook = async (req, res) => {
    const {title, author, category, publishedYear, summary} = req.body;

    const {error} = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    try {
        const authorExists = await Author.findById(author);
        if (!authorExists) {
            return res.status(400).json({message: 'Author does not exist. Please provide a valid author ID or create a new author.'});
        }

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({message: 'Category does not exist. Please provide a valid category ID or create a new category.'});
        }

        const newBook = new Book({title, author, category, publishedYear, summary});
        await newBook.save();

        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


const updateBook = async (req, res) => {
    const {title, author, category, publishedYear, summary} = req.body;

    const {error} = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    try {
        const bookExists = await Book.findById(req.params.id);
        if (!bookExists) {
            return res.status(404).json({message: 'Book not found'});
        }

        if (author) {
            const authorExists = await Author.findById(author);
            if (!authorExists) {
                return res.status(400).json({message: 'Author does not exist. Please provide a valid author ID.'});
            }
        }

        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({message: 'Category does not exist. Please provide a valid category ID.'});
            }
        }

        const updateFields = {};
        if (title) updateFields.title = title;
        if (author) updateFields.author = author;
        if (category) updateFields.category = category;
        if (publishedYear) updateFields.publishedYear = publishedYear;
        if (summary) updateFields.summary = summary;

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateFields, {new: true});

        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


const deleteBook = async (req, res) => {
    try {
        const bookExists = await Book.findById(req.params.id);
        if (!bookExists) {
            return res.status(404).json({message: 'Book not found'});
        }
        await Book.findByIdAndDelete(req.params.id);
        res.json({message: 'Book deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {getBooks, addBook, getBookById, updateBook, deleteBook};
