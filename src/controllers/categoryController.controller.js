const Category = require('../models/Category');
const {categorySchema} = require('../config/validations');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const addCategory = async (req, res) => {
    const {name, description} = req.body;

    const {error} = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    try {
        const newCategory = new Category({name, description});
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateCategory = async (req, res) => {
    const { name, description } = req.body;

    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const categoryExists = await Category.findById(req.params.id);
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );

        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json({message: 'Category deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
