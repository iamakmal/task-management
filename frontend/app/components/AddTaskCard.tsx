"use client";
import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import TextArea from "./TextArea";
import { useCreateTask } from "../util/api";

const AddTaskCard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSuccess = () => {
    setTitle("");
    setDescription("");
    alert("Task added successfully!");
  };

  const handleError = () => {
    alert("Failed to add task. Please try again.");
  };

  const { mutate } = useCreateTask(handleSuccess, handleError);

  const handleClick = () => {
    mutate({ title, description });
  };

  return (
    <div className="flex flex-col gap-5 m-10 w-full">
      <h1 className="text-2xl font-bold">Add a Task</h1>
      <InputField
        name="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          label="Add Task"
          customStyle="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2"
          disabled={!title.trim() || !description.trim()}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AddTaskCard;
