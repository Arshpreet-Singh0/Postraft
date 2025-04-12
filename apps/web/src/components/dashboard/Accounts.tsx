"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { BACKEND_URL } from "@/config/config";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/config/axios";
import { Twitter } from "lucide-react";

const Accounts = () => {
  const [accounts, setAccounts] = useState<{name : string, username : string, twitterId : string, expiresAt : number}[]>([]);
  const { getToken } = useAuth();

  const handleConnect = async () => {
    const token = await getToken(); // from @clerk/nextjs

    window.location.href = `${BACKEND_URL}/api/v1/twitter/login?token=${token}`;
  };

   useEffect(()=>{
    const getAccounts = async()=>{
      const token = await getToken();
      if(!token) return;
      try {
        const res = await axiosInstance.get('twitter/linked-accounts',{
          headers : {
            Authorization :  `Bearer ${token}`
          }
        });

        setAccounts(res?.data);
      } catch (error) {
        console.log(error);
        
      }
    };
    getAccounts();
  },[]);

  console.log(accounts);
  
  return (
    <div className="text-white mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Connected Accounts</h2>

        <Button className="font-semibold hover:bg-pink-600 cursor-pointer" onClick={handleConnect}>
          Connect new Account
        </Button>
      </div>

      <div className="mt-10">

        {
            accounts?.length>0 ? (
                accounts?.map((acc, idx)=>(
                    <div className="flex justify-between items-center h-24 rounded-lg bg-white/5 p-5 " key={idx}>
                        <div className="flex ">
                        <div className="w-20 flex justify-center items-center h-full ">
                        <Twitter />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">Twitter</h2>
                            <h2 className="text-mg font-semibold ">@{acc.username}</h2>
                            <p className="text-sm"></p>
                        </div>
                    </div>

                    <div className="">
                        <Button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Schedule a post</Button>
                    </div>
                    </div>
                ))
            ) : (
                <div className="p-10 flex justify-center items-center">
                    <p className="text-lg font-bold text-center">No accounts connected</p>
                </div>
            )
        }
        
      </div>
    </div>
  );
};

export default Accounts;
