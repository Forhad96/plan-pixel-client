// Importing necessary dependencies
"use client";
import { createContext, useEffect, useState } from "react";
import Ably from "ably/promises";
const ablyKey = process.env.NEXT_PUBLIC_ABLY_KEY;

// Creating an instance of Ably and obtaining the tasks channel
const ably = new Ably.Realtime.Promise({
  key: ablyKey,
});
const ablyChannel = ably.channels.get("tasks");

// Creating a context for sharing Ably-related data with components
export const ablyContext = createContext();


const AblyProvider = ({ children }) => {

  // State for managing the tasks received from Ably
  const [tasks, setTasks] = useState([]);

  // state related to workspace
  const [allWorkspaces,setAllWrokspaces] = useState([])
  const [allWorkspaceMembers,setAllworkspaceMembers] = useState([])
  const [allWorkspaceTasks,setAllWorkspaceTasks] = useState([])

  
  useEffect(() => {
    // Function to connect to Ably
    const connectAbly = async () => {
      try {
        await ably.connect();
        console.log("Ably connected!");
      } catch (error) {
        console.error("Error connecting to Ably:", error);
      }
    };

    // Calling the connectAbly function
    connectAbly();

    ablyChannel.publish("userEmail", { userEmail: "abc@gmail.com" });
    ablyChannel.publish("isTaskDropped", { userEmail: "abc@gmail.com" });
    // Ably listener function to handle incoming messages
    const ablyListener = (message) => {
      // Sorting tasks by position and updatedAt for consistent display
      const sortedTasks = message.data?.sort((a, b) => {
        if (a.position !== b.position) {
          return a.position - b.position;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      
      // Updating state with the sorted tasks
      setTasks(sortedTasks);
    };

    // here recieve user workspaces,tasks and member in it. 
    ablyChannel.subscribe("workspaces",(message)=> {
      const response = message.data
      setAllWrokspaces(response.allWorkspaces)
      setAllworkspaceMembers(response.allMembersInWorkspace)
      setAllWorkspaceTasks(response.allTasksInWorkspace)
      // console.log(response.allMembersInWorkspace)
    })

    // Subscribing to the Ably channel with the ablyListener
    ablyChannel.subscribe(ablyListener);

    // Cleanup function to unsubscribe from the channel and close the Ably connection
    return async () => {
      ablyChannel.unsubscribe(ablyListener);
      try {
        // Closing the Ably connection
        // await ably.close();
        // console.log("Ably connection closed successfully.");
      } catch (error) {
        console.error("Error closing Ably connection:", error);
      }
    };
  }, [tasks]);


  console.log(allWorkspaceMembers)

  // Getting active workspace 
  const activeWorspace = allWorkspaces.find(workspace => workspace.isActive === true)
  



  // Distribute all data by 
  const distributingData = {
    allWorkspaces,
    activeWorspace,
    allWorkspaceMembers,
    allWorkspaceTasks,
    tasks
  }

  // Providing the tasks data to its children through the context
  return (
    <ablyContext.Provider value={distributingData}>{children}</ablyContext.Provider>
  );
};

// Exporting the AblyProvider component as the default export
export default AblyProvider;