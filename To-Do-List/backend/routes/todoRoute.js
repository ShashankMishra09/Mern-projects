import express from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).send({
        message: "Send all fields: title, author, publishYear",
      });
    }
    const newTodo = {
      todo: req.body.todo,
    };
    const todo = await Todo.create(newTodo);
    return res.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
