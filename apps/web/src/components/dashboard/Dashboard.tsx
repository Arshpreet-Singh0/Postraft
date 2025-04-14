"use client";

import { useState } from "react";
import { Button } from "../ui/button"
import { WandSparkles } from "lucide-react";
import Accounts from "./Accounts";
import PostPage from "./posts/PostPage";
import GeneratePost from "./generatepost/GeneratePost";

const Dashboard = () => {
    const [selected, setSelected] = useState("accounts");
  return (
    <div className="lg:w-[75%] w-[95%] mx-auto mt-10 mb-20 min-h-screen">
        <div className="flex rounded-lg gap-2 ">
            <Button className={`${selected=="accounts" ? 'bg-pink-600' : 'bg-none'} hover:bg-pink-700 cursor-pointer`} size={"default"} onClick={() => setSelected("accounts")} >
               Accounts
            </Button>
            <Button className={`${selected=="posts" ? 'bg-pink-600' : 'bg-none'} hover:bg-pink-700 cursor-pointer`} size={"default"} onClick={() => setSelected("posts")} >
               Posts
            </Button>
            <Button className={`${selected=="generatepost" ? 'bg-pink-600' : 'bg-none'} hover:bg-pink-700 cursor-pointer`} size={"default"} onClick={() => setSelected("generatepost")}>
            <WandSparkles size={20} className="mr-1"/> Generate Post
            </Button>
            <Button className={`${selected=="settings" ? 'bg-pink-600' : 'bg-none'} hover:bg-pink-700 cursor-pointer`} size={"default"} onClick={() => setSelected("settings")}>
               Settings
            </Button>
        </div>

        <ShowPage value={selected}/>

        
    </div>
  )
}

export default Dashboard;

const ShowPage = ({value} : {
   value : string
}) => {
   switch (value){
      case "accounts" :
         return <Accounts />
      case "posts" : 
         return <PostPage />
      case "generatepost" :
         return <GeneratePost />
   }
}