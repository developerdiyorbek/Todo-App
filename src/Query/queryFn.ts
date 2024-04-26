"use client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "./queryKey";

import { todoUtils } from "@/utils/todoUtils";

export const useTodo = function () {
  return useQuery({
    queryKey: [QUERY_KEY.tasks],
    queryFn: todoUtils.getTodos,
  });
};
