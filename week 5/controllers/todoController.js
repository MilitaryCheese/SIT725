const Todo = require('../models/todoModel');

let todos = []; // In-memory storage (no DB)

exports.getTodos = (req, res) => {
    res.render('index', { todos });
};

exports.addTodo = (req, res) => {
    const newTodo = new Todo(req.body.task);
    todos.push(newTodo);
    res.redirect('/');
};

exports.deleteTodo = (req, res) => {
    const index = req.params.index;
    todos.splice(index, 1);
    res.redirect('/');
};