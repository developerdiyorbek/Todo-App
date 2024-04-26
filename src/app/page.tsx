"use client";
import { useTodo } from "@/Query";
import { TaskType } from "@/interfaces/interface";
import Todo from "@/components/Todo";
import Loading from "@/components/loading/Loading";
import React, { useState } from "react";
import { Pagination } from "@mui/material";
import AddTask from "@/components/AddTask";
import SelectComponent from "@/components/SelectComponent";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const getTasks = useTodo();

  // filter
  let filterData: TaskType[] = getTasks?.data?.data;

  switch (filter) {
    case "all":
      filterData = getTasks?.data?.data;
      break;
    case "completed":
      filterData = getTasks?.data?.data.filter(
        (item: TaskType) => item.completed == true
      );
      break;
    case "uncompleted":
      filterData = getTasks?.data?.data.filter(
        (item: TaskType) => item.completed === false
      );
      break;
  }

  // pagination
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = filterData
    ? Math.ceil(filterData.length / itemsPerPage)
    : 0;

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const currentPageData = filterData?.slice(startIndex, endIndex);

  // loading
  if (getTasks.isLoading) return <Loading />;

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <AddTask />
        <SelectComponent filter={filter} setFilter={setFilter} />
        <ul>
          {currentPageData?.length ? (
            currentPageData.map((task: TaskType) => (
              <Todo key={task.id} todo={task} todos={getTasks?.data?.data} />
            ))
          ) : (
            <p className="text-gray-500">No tasks yet :(</p>
          )}
        </ul>
        <div>
          <div className="w-full  mb-24 flex items-center justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
              className={`${currentPageData.length ? "" : "hidden"}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
