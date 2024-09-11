const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    publishedYear: Joi.number().integer().min(0).max(new Date().getFullYear()),
    summary: Joi.string().optional()
});



const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
});

const authorSchema = Joi.object({
    name: Joi.string().required(),
    biography: Joi.string().optional()
});

module.exports = {bookSchema, categorySchema, authorSchema};