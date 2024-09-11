const express = require('express');
const router = express.Router();
const {getBooks, addBook, getBookById, updateBook, deleteBook} = require('../controllers/bookController.controller');
const {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController.controller');

const {
    addAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authorController.controller");


router.get('/books', getBooks);
router.post('/book', addBook);
router.get('/book/:id', getBookById);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);


router.post('/category', addCategory);
router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);


router.post('/author', addAuthor);
router.get('/authors', getAuthors);
router.get('/author/:id', getAuthorById);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);

module.exports = router;
