import { TaskType, TodoProps } from "@/interfaces/interface";
import { todoUtils } from "@/utils/todoUtils";
import { Button, Checkbox, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const Todo = (props: TodoProps) => {
  const queryClient = useQueryClient();
  const [completed, setCompleted] = useState(props.todo.completed);

  // delete todo function
  const deleteTodo = useMutation({
    mutationFn: todoUtils.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
      toast.success("Task deleted");
    },
    onError: (err) => {
      console.log(err, "Delete task");
      toast.error("Error");
    },
  });

  // delete Task
  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  // edit Task
  const editTodo = useMutation({
    mutationFn: todoUtils.editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
    },
    onError: (err) => {
      console.log(err, "Edit task");
    },
  });

  // completed task
  const handleComplete = (id: number) => {
    const getTodoById: TaskType | undefined = props?.todos.find(
      (todo: TaskType) => todo.id == id
    );
    const complete = !getTodoById?.completed;
    setCompleted(complete);
    editTodo.mutate({ id, complete });
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md mb-2">
      <label className="w-full cursor-pointer flex items-center gap-1">
        <Checkbox
          name="checkbox"
          checked={completed}
          color="success"
          onChange={() => handleComplete(props.todo.id)}
        />
        <Typography
          component="span"
          className={`${completed ? "line-through opacity-75" : "opacity-100"}`}
        >
          {props?.todo.title}
        </Typography>
      </label>
      <Button
        sx={{
          color: "white",
          backgroundColor: "#ff0000",
          paddingTop: "10px",
          paddingBottom: "10px",
          "&:hover": {
            backgroundColor: "#cc0000",
          },
        }}
        onClick={() => handleDelete(props?.todo.id)}
      >
        <FaTrash />
      </Button>
    </li>
  );
};

export default Todo;
