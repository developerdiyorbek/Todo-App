import { customAxios } from "@/configs/axios.config";
import { editTodoTypes, getTodosType } from "@/interfaces/interface";

export const todoUtils = {
  getTodos: async () => {
    const data = await customAxios.get("tasks");
    return data;
  },
  addTodo: async ({ title, id }: getTodosType) => {
    const data = customAxios.post("tasks", {
      title,
      id,
    });
    return data;
  },
  editTodo: async ({ id, complete }: editTodoTypes) => {
    const data = await customAxios.put(`tasks/${id}`, {
      completed: complete,
    });
    return data;
  },
  deleteTodo: async (id: number) => {
    const data = await customAxios.delete(`tasks/${id}`);
    return data;
  },
};
