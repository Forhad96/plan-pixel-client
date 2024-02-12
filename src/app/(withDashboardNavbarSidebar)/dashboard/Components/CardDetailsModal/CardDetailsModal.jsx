import Image from "next/image";
import CardMembers from "./CardMembers";
import IndividualCardTasks from "./IndividualCardTasks";
import member03Img from "@/assets/team-members/rahim.jpg";

const CardDetailsModal = ({ openTaskDetails, setOpenTaskDetails, children }) => {

    const task = {
        name: 'Task name',
        description: 'A user flow is a visualization of a path that a user takes  through a website'
    }

    const members = [
        {
            email: "Shakil Talukdar",
        },
        {
            email: "Sami Apu",
        },
        {
            email: "Sajid khan",
        },
        {
            email: "Forhad kapali",
        },

    ]




    return (
        <div
            className={`${openTaskDetails ? "block" : "hidden"} 
        bg-[#02001A33] backdrop-blur-[9px] text-black w-screen h-screen top-0 left-0 z-30 fixed lg:px-40 px-24  py-16`}
        >
            <div className=" bg-[#FFFFFF] w-[900px] mx-auto h-full rounded-2xl overflow-auto py-4 pl-10 pr-5">
                <div className="flex justify-end">
                    <button onClick={() => setOpenTaskDetails(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                        >
                            <path
                                d="M10.5578 10.7232L10.6354 10.636C10.998 10.2734 11.5699 10.2475 11.9625 10.5583L12.0497 10.636L16.9994 15.5858L21.9492 10.636C22.3118 10.2734 22.8836 10.2475 23.2762 10.5583L23.3634 10.636C23.726 10.9986 23.7519 11.5705 23.4411 11.9631L23.3634 12.0503L18.4136 17L23.3634 21.9497C23.726 22.3124 23.7519 22.8842 23.4411 23.2768L23.3634 23.364C23.0008 23.7266 22.4289 23.7525 22.0363 23.4417L21.9492 23.364L16.9994 18.4142L12.0497 23.364C11.687 23.7266 11.1152 23.7525 10.7227 23.4417L10.6354 23.364C10.2728 23.0014 10.2469 22.4295 10.5577 22.0369L10.6354 21.9497L15.5852 17L10.6354 12.0503C10.2728 11.6876 10.2469 11.1158 10.5578 10.7232Z"
                                fill="#212121"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between h-full">
                    <div className="space-y-2">
                        {/* card name, description and other info */}
                        <p className="text-2xl font-semibold">{task?.name}</p>
                        <p>{task?.description}</p>
                        <div className="flex gap-1">
                            <p className="bg-[#50B57733] text-[10px] font-semibold px-3 py-2  rounded-md">Denographics</p>
                            <p className="bg-[#FBBC0540] text-[10px] font-semibold px-3 py-2  rounded-md">user story</p>
                            <p className="bg-[#93C64840] text-[10px] font-semibold px-3 py-2  rounded-md">Motivations</p>
                            <p className="bg-[#50B57780] text-[10px] font-semibold px-3 py-2  rounded-md">Attitudes</p>
                        </div>
                        {/* members */}
                        <div className="pt-1">
                            <p className="text-xs font-semibold">Members</p>
                            <CardMembers></CardMembers>
                        </div>

                        {/* Individual Tasks */}
                        <div className="pt-8 flex flex-col gap-5">
                            {
                                members?.map(member =>
                                    <IndividualCardTasks key={member?.email} email={member?.email}></IndividualCardTasks>)
                            }
                        </div>

                        {/* comment section */}
                        <div className="flex gap-3 py-8">
                            <Image
                                width={30}
                                height={30}
                                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                                src={member03Img}
                                alt=""
                            />
                            <textarea placeholder="Write down your comment here" name="" id="" cols="30" rows="10"
                            className="bg-[#D9D9D980] w-full h-24 p-3 border-none rounded-lg "></textarea>
                        </div>
                    </div>


                    {/* Date Time */}
                    <div className="h-full w-[250px] font-semibold">
                        <div className="bg-[#D9D9D966] h-full w-full  p-4 rounded-lg">
                            <h4 className=" w-full bg-[#D9D9D9] rounded-lg p-3 pl-6">Join</h4>
                            <h4 className=" w-full bg-[#D9D9D9] rounded-lg p-3 pl-6 mt-2">Members</h4>
                            <div className="border-2 mt-6 border-[#D9D9D9]"></div>
                            {/* dates */}
                            <div className=" mt-4">
                                <p className="">Assign Date:</p>
                                <h4 className="text-2xl mt-2">02 Apr 2022</h4>
                            </div>
                            <div className=" mt-4">
                                <p className="">Deadline:</p>
                                <h4 className="text-2xl mt-2">02 Apr 2022</h4>
                            </div>

                            <h4 className=" w-full bg-[#D9D9D9] rounded-lg p-3 pl-6 mt-5">Add checklist</h4>


                        </div>
                        <button className="w-full bg-[#50B577] rounded-lg py-3 text-white mt-6">Save Task</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardDetailsModal;

