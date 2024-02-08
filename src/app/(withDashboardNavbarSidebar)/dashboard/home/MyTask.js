import threeDotIcon from "@/assets/dashboard/threeDot.svg";
import timeIcon from "@/assets/dashboard/time.svg";
import Image from "next/image";
import style from "./Scrollbar.module.css";
import { useQuery } from "@tanstack/react-query";
import useTranstackData from "@/hooks/useTanstack/useTranstackData";
import { useContext, useEffect, useMemo, useState } from "react";
import apiConnector from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { AuthContext } from "@/Providers/AuthProviders";

const MyTask = ({ date }) => {
const { user } = useContext(AuthContext);
const modifyDate = useMemo(() => date.toISOString().substring(0, 10), [date]);
const apiEndpoint = `/tasksFiltered?targetDate=${modifyDate}&tasksOwner=${user?.email}`;
const { data, refetch, isLoading } = useTranstackData(apiEndpoint, "tasks");
const [tasks, setTasks] = useState(data);

useEffect(() => {
  if (data) {
    setTasks(data);
  }
}, [data]);

useEffect(() => {
  refetch();
}, [modifyDate, refetch]);

if (isLoading) {
  return <p>Loading...</p>;
}

  return (
    <div
      className={`w-full mt-4 shadow-md min-h-80 rounded-xl p-6 overflow-auto border-2 border-[#E6E8EC]`}
    >
      <h1 className=" text-2xl font-bold p-4">My Task</h1>
      {tasks?.map((task, index) => (
        <Task
          key={task?._id}
          index={index}
          name={task?.title}
          tasksId={task._id}
          refetch={refetch}
          date={date}
        />
      ))}
    </div>
  );
};
export default MyTask;

function Task({ name, tasksId, refetch, index }) {
  const xios = apiConnector();
  const handleIsDone = async (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const res = await xios.patch(
        `/updateTaskState/?id=${tasksId}&&state=${"done"}`
      );
      console.log(res);
      if (res.data.updated.modifiedCount > 0) {
        toast.success("Complete task");
        refetch();
      }
    }
  };
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9F9F9] mb-3">
      <h3 className="text-sm font-semibold">
        <span className="me-2">{index + 1}.</span>
        {name}
      </h3>
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor="amber"
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-gray-300 checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
            id="amber"
            onChange={handleIsDone}
          />
          <span className="absolute text-white transition-opacity opacity-50 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>
    </div>
  );
}
