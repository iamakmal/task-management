"use client";
import React from "react";
import TaskCard from "./TaskCard";
import { useCompleteTask, useGetLastFiveTasks } from "../util/api";

const TasksList = () => {
  const { data: lastFiveTasks } = useGetLastFiveTasks();

  const handleSuccess = () => {
    alert("Task marked as complete!");
  };
  const handleError = () => {
    alert("Failed to mark task as complete. Please try again.");
  };

  const { mutate: completeTask } = useCompleteTask(handleSuccess, handleError);

  const handleConfirmClick = (taskId: string) => {
    completeTask(taskId);
  };

  return (
    <div className="flex flex-col w-full m-10 gap-5">
      {lastFiveTasks?.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          onClick={() => handleConfirmClick(task.id)}
        />
      ))}
    </div>
  );
};

export default TasksList;
