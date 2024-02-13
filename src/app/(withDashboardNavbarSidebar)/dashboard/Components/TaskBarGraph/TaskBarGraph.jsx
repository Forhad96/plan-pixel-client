'use client'

import useAllTasks from "@/hooks/useAllTasks";
import useFilterTasks from "@/hooks/useFilterTasks";
import { IoIosArrowDown } from "react-icons/io";

const TaskBarGraph = () => {

    const { data: allTasks } = useAllTasks();
    // console.log(allTasks);

    const todo = allTasks?.filter(task => task?.status === "to-do");
    const upcoming = allTasks?.filter(task => task?.status === "upcoming");
    const doing = allTasks?.filter(task => task?.status === "doing");
    const done = allTasks?.filter(task => task?.status === "done");



    const taskInfo = [
        {
            tasks: upcoming?.length,
            color: '#FABE7A',
            alpha: 'a'
        },
        {
            tasks: todo?.length,
            color: '#F6866A',
            alpha: 'b'

        },
        {
            tasks: doing?.length,
            color: '#59E6F6',
            alpha: 'c'
        },
        {
            tasks: done?.length,
            color: '#7661E2',
            alpha: 'd'
        },
    ]

    return (
        <div className="w-full h-fit border-2 border-[#E6E8EC] rounded-lg p-5">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Teams Strength</h3>
                <div className="text-[#00000099] flex gap-2 items-center">
                    <p>22 Apr 2024</p>
                    <IoIosArrowDown className="text-2xl"></IoIosArrowDown>
                </div>
            </div>
            {/* Bar Chart */}
            <div className="flex gap-3 w-full items-end mt-6">
                {
                    taskInfo?.map((task, index) => <div key={index} className="flex flex-col space-y-[2px] items-center justify-center w-full">
                        <p className="text-[#828282]">{task?.tasks}</p>
                        <div className={`w-full rounded-t-lg bg-[${task?.color}]`}
                            style={{ height: `${task?.tasks * 20}px`, borderBottom: `2px solid ${task?.color}` }}></div>
                        <p className="text-[#828282]">{task?.alpha}</p>
                    </div>)
                }
            </div>
            <div className="text-sm font-semibold text-[#828282] mt-7 grid grid-cols-2 gap-4">
                <div className="flex gap-3 items-center">
                    <p className="bg-[#FABE7A] px-3 py-1 text-white rounded-lg">a</p>
                    <p>Upcoming</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="bg-[#F6866A] px-3 py-1 text-white rounded-lg">b</p>
                    <p>Todo</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="bg-[#59E6F6] px-3 py-1 text-white rounded-lg">c</p>
                    <p>Working</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="bg-[#7661E2] px-3 py-1 text-white rounded-lg">d</p>
                    <p>Done</p>
                </div>
            </div>
        </div>
    );
};

export default TaskBarGraph;