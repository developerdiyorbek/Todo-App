import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { todoUtils } from "@/utils/todoUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const AddTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // add task function
  const addTask = useMutation({
    mutationFn: todoUtils.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ type: "all" });
      setIsLoading(false);
    },
    onError: (err) => {
      console.log(err, "error to add task");
      setIsLoading(false);
    },
  });

  // add task
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const inputValue = event.target.task.value.trim();
    if (inputValue.length === 0) {
      toast.error("Write something!");
      setIsLoading(false);
    } else {
      addTask.mutate({
        title: inputValue,
        id: uuidv4(),
      });
      toast.success("Task added succesfully");
    }
    event.target.task.value = "";
  };

  return (
    <form className="flex items-center mb-4" onSubmit={handleSubmit}>
      <TextField
        label="Enter task"
        variant="outlined"
        className="flex-grow px-4 py-2 rounded-l-md"
        name="task"
        sx={{ mr: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="rounded-r-md hover:bg-blue-600"
        sx={{ height: "55px" }}
        disabled={isLoading}
      >
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;
