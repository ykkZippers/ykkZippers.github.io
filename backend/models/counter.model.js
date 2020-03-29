// We'll use mongoose to create a schema for an exercise document

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
        username: {
                type: String, required: true,
                unique: true, trim: true,
                minlength: 3
        },
        count: { type: Number, min: 0, required: true },
}, {
        timestamps: true    // create field for when created/modified
})

// create and export exericse
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;