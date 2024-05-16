const Task = require("../models/Task");

const TaskController = {
    async create(req, res, next) {
        try {
            const tasks = await Task.create(req.body);
            res.status(201).send(tasks);
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res) {
        try {
            const tasks = await Task.find()
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting all tasks" });
        }
    },
    async getById(req, res) {
        try {
            const tasks = await Task.findOne({ _id: req.params.id})
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting one task" });
        }
    },
    async getByTitle(req, res) {
        try {
            const tasks = await Task.findOne({ title: req.params.text, })
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when getting one task" });
        }
    },
    async update(req, res, next) {
        try {
            const tasks = await Task.findOneAndUpdate({ _id: req.params.id});
            res.status(201).send(tasks);
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res) {
        try {
            const tasks = await Task.findOneAndDelete({ _id: req.params.id });
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error when deleting a task" });
        }
    },
};
module.exports = TaskController;
