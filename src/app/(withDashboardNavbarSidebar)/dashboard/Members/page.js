"use client"
import React, { useState } from "react";
import TeamMembers from "./Components/TeamMembers";
import useGlobalTaskData from "@/hooks/useGlobalTaskData";
import { Dropdown } from "flowbite-react";
import TaskCard from "./Components/TaskCard";
import useFilterTasks from "@/hooks/useFilterTasks ";

const page = () => {
  const { alltasks } = useGlobalTaskData();
  const [filter, setFilter] = useState("to-do")
  const tasks = useFilterTasks(alltasks, filter);
  console.log('members tasks', tasks);

  return (
    <div className="grid grid-cols-3">
      <div className="">
        <TeamMembers />
      </div>
      <div className="col-span-2 p-8 ">
        <div className="bg-gray-200 w-fit pr-6 py-3 rounded-md shadow-md">
          <Dropdown
            className="bg-gray-100 py-2 px-3 rounded-lg mt-4"
            inline
            label={
              <div className="text-start px-6 ">
                {/* <p className="text-xs opacity-55">workspace -</p> */}
                <h2 className="capitalize ">{filter}</h2>
              </div>
            }
          >
            <Dropdown.Item className="hover:text-green-600 font-semibold" onClick={() => setFilter('to-do')}>To-do</Dropdown.Item>
            <Dropdown.Item className="hover:text-green-600 font-semibold" onClick={() => setFilter('doing')}>Doing</Dropdown.Item>
            <Dropdown.Item className="hover:text-green-600 font-semibold" onClick={() => setFilter('done')}>Done</Dropdown.Item>
            <Dropdown.Divider />

          </Dropdown>
        </div>
        <div className="gap-4 flex flex-wrap">{
          tasks.map((task, idx) => (
            <TaskCard key={idx} task={task} />
          ))
        }
        </div>


      </div>
    </div>
  );
};

export default page;