"use client";

import { useTodo } from "@/Query";
import { TaskType } from "@/interfaces/interface";
import Todo from "@/components/Todo";
import Loading from "@/components/Loading";
import React, { useState } from "react";
import { Pagination } from "@mui/material";
import AddTask from "@/components/AddTask";
import SelectComponent from "@/components/SelectComponent";
import { applyFilter } from "@/utils/filter";
import { applyPagination } from "@/utils/pagination";

export default function Home() {
  const getTasks = useTodo();

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState<number>(1);

  const dataFiltered = applyFilter({
    inputData: getTasks?.data,
    filterName: filter,
  });

  const { paginationData, totalPages } = applyPagination({
    inputData: dataFiltered,
    page,
  });

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  // loading
  if (getTasks.isLoading) return <Loading />;

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <AddTask />
        <SelectComponent filter={filter} setFilter={setFilter} />
        <ul>
          {dataFiltered?.length ? (
            paginationData.map((task: TaskType) => (
              <Todo key={task.id} todo={task} todos={getTasks?.data} />
            ))
          ) : (
            <p className="text-gray-500">
              {filter === "all"
                ? "There is no tasks"
                : `${filter} tasks is not available`}
            </p>
          )}
        </ul>
        <div>
          <div className="w-full  mb-24 flex items-center justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
              className={`${paginationData.length ? "" : "hidden"}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
