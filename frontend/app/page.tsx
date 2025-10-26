import AddTaskCard from "./components/AddTaskCard";
import TasksList from "./components/TasksList";

export default function Home() {
  return (
    <div className="flex justify-evenly flex-wrap md:flex-nowrap min-h-screen">
      <AddTaskCard />
      <div className="bg-gray-300 my-6 md:my-10 md:mx-6 w-full h-px md:w-2 md:h-auto" />
      <TasksList />
    </div>
  );
}
