const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:
    {
        type: String,
        require: [true, "Please fill in the title field"]
    },
    completed:
    {
        type: Boolean,
    }
}, { timestamps: true });
TaskSchema.index({
    title:"text"
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;