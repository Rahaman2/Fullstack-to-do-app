const mongoose = require('mongoose');

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "(no title)"
    },
    description: {
        type: String,
        default: "No description provided"
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);
