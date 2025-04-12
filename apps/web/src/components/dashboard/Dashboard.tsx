"use client";

import { useState } from "react";
import { Button } from "../ui/button"
import { WandSparkles } from "lucide-react";
import Accounts from "./Accounts";

const Dashboard = () => {
    const [selected, setSelected] = useState("accounts");
  return (
    <div className="w-[75%] mx-auto  mt-10 mb-20">
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

        <Accounts />
    </div>
  )
}

export default Dashboard