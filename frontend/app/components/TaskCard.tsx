import React from "react";
import Button from "./Button";

interface Props {
  title?: string;
  description?: string;
}

const TaskCard = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-3 gap-1 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex justify-between items-center gap-2">
        <p className="text-gray-700">{description}</p>
        <Button
          label="Done"
          customStyle="bg-transparent border border-gray-400 text-black hover:bg-green-500 hover:text-white px-8 py-2"
        />
      </div>
    </div>
  );
};

export default TaskCard;
