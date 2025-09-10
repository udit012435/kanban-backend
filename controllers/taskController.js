import Task from "../models/Task.js";

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const { content, status } = req.body;
    const newTask = new Task({ content, status: status || "todo" });
    await newTask.save();

    req.io.emit("taskAdded", newTask); 

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update task content or status
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { content, status },
      { new: true }
    );

    req.io.emit("taskUpdated", updatedTask);

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    req.io.emit("taskDeleted", deletedTask);

    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getTasks, addTask, updateTask, deleteTask };
