import { TaskType, TodoProps } from "@/interfaces/interface";
import { todoUtils } from "@/utils/todoUtils";
import { Button, Checkbox, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const Todo = (props: TodoProps) => {
  const queryClient = useQueryClient();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // delete todo function
  const deleteTodo = useMutation({
    mutationFn: todoUtils.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
      toast.success("Task deleted");
      setDeleteLoading(false);
    },
    onError: (err) => {
      console.error(err, "Delete task");
      toast.error("Error");
      setDeleteLoading(false);
    },
  });

  // delete Task
  const handleDelete = (id: number) => {
    setDeleteLoading(true);
    deleteTodo.mutate(id);
  };

  // edit Task
  const editTodo = useMutation({
    mutationFn: todoUtils.editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
      setIsLoading(false);
    },
    onError: (err) => {
      console.error(err, "Edit task");
      setIsLoading(false);
    },
  });

  // completed task
  const handleComplete = (todo: TaskType) => {
    setIsLoading(true);
    editTodo.mutate({ id: todo.id, complete: !todo.completed });
  };

  return (
    <li className="bg-gray-100 px-4 py-2 rounded-md mb-2 flex items-center justify-between">
      <label className="w-full cursor-pointer flex items-center gap-1">
        <Checkbox
          name="checkbox"
          checked={props.todo.completed}
          color={props.todo.completed ? "success" : "warning"}
          onChange={() => handleComplete(props.todo)}
          disabled={isLoading}
        />
        <Typography
          component="span"
          className={`w-3/5 ${
            props.todo.completed ? "line-through opacity-75" : "opacity-100"
          }`}
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
        disabled={deleteLoading}
        onClick={() => handleDelete(props?.todo.id)}
      >
        <FaTrash />
      </Button>
    </li>
  );
};

export default Todo;
