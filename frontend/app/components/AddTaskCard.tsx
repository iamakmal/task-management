import Button from "./Button";
import InputField from "./InputField";
import TextArea from "./TextArea";

const AddTaskCard = () => {
  return (
    <div className="flex flex-col gap-5 m-10 w-full">
      <h1 className="text-2xl font-bold">Add a Task</h1>
      <InputField name="Title" required />
      <TextArea placeholder="Task Description" />
      <div className="flex justify-end">
        <Button
          label="Add Task"
          customStyle="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2"
        />
      </div>
    </div>
  );
};

export default AddTaskCard;
