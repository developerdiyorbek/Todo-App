import { TaskType } from "@/interfaces/interface";

interface Props {
  inputData: TaskType[];
  filterName: string;
}

export function applyFilter({ inputData, filterName }: Props) {
  switch (filterName) {
    case "all":
      inputData = inputData;
      break;
    case "completed":
      inputData = inputData.filter((item: TaskType) => item.completed == true);
      break;
    case "uncompleted":
      inputData = inputData.filter(
        (item: TaskType) => item.completed === false
      );
      break;
  }

  return inputData;
}
