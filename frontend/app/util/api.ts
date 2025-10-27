import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { TaskPayload, TaskResponse } from "./types";

const createTask = async (taskPayload: TaskPayload) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/tasks`, taskPayload);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const useCreateTask = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["last-five-tasks"] });
      onSuccess();
    },
    onError,
  });
};

export const useGetLastFiveTasks = (): UseQueryResult<TaskResponse[]> => {
  return useQuery({
    queryKey: ["last-five-tasks"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/tasks/lastFiveIncompleteTasks`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching last five tasks:", error);
        throw error;
      }
    },
  });
};

const completeTask = async (taskId: string) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/tasks/completeTask/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};

export const useCompleteTask = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["last-five-tasks"] });
      onSuccess();
    },
    onError,
  });
};
