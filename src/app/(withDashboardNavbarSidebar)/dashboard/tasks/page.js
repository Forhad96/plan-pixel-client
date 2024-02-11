"use client";
import { LuListTodo } from "react-icons/lu";
import { FiPlusSquare } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Task from "./Task";
import "@/styles/globals.css";
import { use, useContext, useEffect, useState } from "react";
import TaskModal from "../Components/TaskModal";
import useFilterTasks from "@/hooks/useFilterTasks ";
import useGlobalTaskData from "@/hooks/useGlobalTaskData";
import { BsThreeDotsVertical } from "react-icons/bs";
import useGetSocketData from "@/hooks/useGetAllTasks";
import UpdateTask from "../Components/UpdateTask";
import useGlobalContext from "@/hooks/useGlobalContext";
import { ablyContext } from "@/components/ably/AblyProvider";

const Tasks = () => {
  // manage all your state here..
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { alltasks, dropOn, draggingOver, dragOverElementName, isDragging,draggingTaskId } =
    useGlobalTaskData();
    


  // Tasks in different status
  const toDoTasks = useFilterTasks(alltasks, "to-do",draggingTaskId,dragOverElementName);
  const upcomingTasks = useFilterTasks(alltasks, "upcoming",draggingTaskId,dragOverElementName);
  const doingTasks = useFilterTasks(alltasks, "doing",draggingTaskId,dragOverElementName);
  const doneTasks = useFilterTasks(alltasks, "done",draggingTaskId,dragOverElementName);


  const {defaultActiveWorkspace} = useGlobalContext()
  const {activeWorspace} = useContext(ablyContext)
  const { title,description } = activeWorspace || defaultActiveWorkspace || { title: "Demo title" };

  
  
  return (
    <>
      {typeof window !== "undefined" && (
        <section>
          {/* header section  */}
          <div className="md:flex ml-3 justify-between items-start border-b pb-2 pt-6 border-white/50">
            <div className="">
              <h6 className="font-medium text-[20px] ">{title?title:"your board"}</h6>
              {
                description?<p className="md:w-full lg:w-[500px] text-gray-400">{description}</p>:(
              <p className="opacity-80 mt-1 font-light text-sm">
                Create and complete<br/> and manage your tasks using TaskTo task
                board.
              </p>
              )
              }
            </div>
            <div className="flex lg:w-52">
              <button
                onClick={() => setOpenModal(!openModal)}
                className="bg-white text-black flex text-sm px-5 py-3 rounded-md font-bold"
              >
                <FiPlusSquare className="inline mb-1 me-2 text-xl" /> Add Task
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-2  mt-6 min-h-screen">
            {/* upcoming task */}
            <div
              droppable="true"
              onDragOver={(e) => draggingOver(e)}
              onDrop={(e) => dropOn(e)}
              id="upcoming"
              className={`min-h-screen ${isDragging ? "z-20 relative" : ""
                } px-2 rounded-lg transition-all duration-1000 ${dragOverElementName === "upcoming" ? "bg-[#E3E4E6]" : ""
                }`}
            >
              <div
                className={`bg-gray-300/20 text-black px-6 py-4 flex items-center mt-2 gap-4 rounded-md ${dragOverElementName == "upcoming" ? "bg-[white]" : ""
                  }`}
              >
                <LuListTodo className="text-2xl" />{" "}
                <h2 className="">Upcoming</h2>
              </div>

              {upcomingTasks?.map((task, idx) => (
                <div>
                  <Task idx={idx} key={task._id} task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
                  <UpdateTask task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal}></UpdateTask>
                </div>
              ))}
            </div>
            {/* to do task */}
            <div
              droppable="true"
              onDragOver={(e) => draggingOver(e)}
              onDrop={(e) => dropOn(e)}
              id="to-do"
              className={`min-h-screen px-2 ${dragOverElementName && "realative z-50"
                } rounded-lg transition-all duration-1000 ${dragOverElementName === "to-do" ? "bg-[#E3E4E6]" : ""
                }`}
            >
              <div
                className={`bg-gray-300/20 text-black px-6 mt-2 py-4 flex items-center gap-4 rounded-md ${dragOverElementName == "to-do" ? "bg-[white]" : ""
                  }`}
              >
                <LuListTodo className="text-2xl" /> <h2>To-do</h2>
              </div>

              {toDoTasks?.map((task, idx) => (
                <div>
                  <Task idx={idx} key={task._id} task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
                  <UpdateTask task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal}></UpdateTask>
                </div>
              ))}
            </div>
            {/* ongoing/doing tasks */}
            <div
              droppable="true"
              onDragOver={(e) => draggingOver(e)}
              onDrop={(e) => dropOn(e)}
              id="doing"
              className={`min-h-screen px-2 rounded-lg transition-all duration-1000 ${dragOverElementName === "doing" ? "bg-[#E3E4E6]" : ""
                }`}
            >
              <div
                className={`bg-gray-300/20 mt-2 text-black px-6 py-4 flex items-center gap-4 rounded-md ${dragOverElementName == "doing" ? "bg-[white]" : ""
                  }`}
              >
                <LuListTodo className="text-2xl" /> <h2 className="">Doing</h2>
              </div>

              {doingTasks?.map((task, idx) => (
                <div>
                  <Task idx={idx} key={task._id} task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
                  <UpdateTask task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal}></UpdateTask>
                </div>
              ))}
            </div>
            {/* done/completed tasks */}
            <div
              droppable="true"
              onDragOver={(e) => draggingOver(e)}
              onDrop={(e) => dropOn(e)}
              id="done"
              className={`px-2 min-h-screen rounded-lg transition-all duration-1000 ${dragOverElementName === "done" ? "bg-[#E3E4E6]" : ""
                }`}
            >
              <div
                className={`bg-gray-300/20 text-black px-6 py-4 mt-2 flex items-center gap-4 rounded-md ${dragOverElementName == "done" ? "bg-[white]" : ""
                  }`}
              >
                <LuListTodo className="text-2xl" /> <h2 className="">Done</h2>
              </div>

              {doneTasks?.map((task, idx) => (
                <div>
                  <Task idx={idx} key={task._id} task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
                  <UpdateTask task={task} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal}></UpdateTask>
                </div>
              ))}
            </div>
          </div>
          <TaskModal
            openModal={openModal}
            setOpenModal={setOpenModal}
          ></TaskModal>
        </section>
      )}
    </>
  );
};

export default Tasks;
