import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Todo = mongoose.model('todo', todoSchema);