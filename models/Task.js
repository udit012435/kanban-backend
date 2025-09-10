import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    status: { 
        type: String, 
        enum: ["todo", "in-progress", "done"], 
        default: "todo" 
    },

    createdAt: { 
        type: Date,
        default: Date.now 
    },
})

const Task = mongoose.model("Task",taskSchema);
export default Task;