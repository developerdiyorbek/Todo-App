import { TaskType } from "@/interfaces/interface";

interface Props {
  inputData: TaskType[];
  page: number;
}

export function applyPagination({ inputData, page }: Props) {
  const itemsPerPage = 5;

  const totalPages = inputData ? Math.ceil(inputData.length / itemsPerPage) : 0;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const paginationData = inputData?.slice(startIndex, endIndex);

  return { paginationData, totalPages };
}
