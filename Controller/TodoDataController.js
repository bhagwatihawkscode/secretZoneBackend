import TodoCollection from "../Model/TodoModel.js";

const TodoData = async (req, res) => {
  try {
    let Todo = req.body;
    Todo.userID = global.user_id;
    Todo.isFavorited = "false";
    let TodoCollectionData = new TodoCollection(Todo);

    await TodoCollectionData.save();
    return res
      .status(201)
      .json({ success: true, message: "Secret Add SuccessFully " });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error " });
  }
};

export default TodoData;
