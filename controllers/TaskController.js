const Task = require("../models/Task");
const User = require("../models/User")

const TaskController = {
    async create(req, res, next) {
        try {
            const tasks = await Task.create(req.body);
            res.status(201).send({ message: "Task created", tasks });
            await User.findByIdAndUpdate(req.user._id, { $push: { taskIds: tasks._id } })
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 3 } = req.query;
            const tasks = await Task.find()
                .limit(limit)
                .skip((page - 1) * limit)
            res.send({ message: "Tasks found", tasks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting all tasks" });
        }
    },
    async getById(req, res) {
        try {
            const tasks = await Task.findOne({ _id: req.params.id })
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting one task" });
        }
    },
    async getByTitle(req, res) {
        try {
            const tasks = await Task.find({
                $text: {
                    $search: req.params.title
                },
            })
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting one task" });
        }
    },
    async update(req, res, next) {
        try {
            const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).send({ message: "Update succes", tasks });
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res) {
        try {
            const tasks = await Task.findByIdAndDelete({ _id: req.params.id });
            res.send({ message: "task deleted", tasks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when deleting a task" });
        }
    },
};
module.exports = TaskController;
