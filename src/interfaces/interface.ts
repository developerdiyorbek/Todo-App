export interface TaskType {
  id: number;
  title: string;
  name: string;
  completed: boolean;
}

export interface TodoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    name: string;
  };
  todos: TaskType[];
}

export interface SelectProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface getTodosType {
  title: string;
  id: string;
}

export interface editTodoTypes {
  id: number;
  complete: boolean;
}
