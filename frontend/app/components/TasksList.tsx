import React from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  return (
    <div className="flex flex-col w-full m-10 gap-5">
      <TaskCard
        title="Sample Task"
        description="This is a sample task description."
      />
      <TaskCard
        title="Sample Task"
        description="This is a sample task description."
      />
      <TaskCard
        title="Sample Task"
        description="This is a sample task description."
      />
      <TaskCard
        title="Sample Task"
        description="This is a sample task description."
      />
      <TaskCard
        title="Sample Task"
        description="This is a sample task description."
      />
    </div>
  );
};

export default TasksList;
