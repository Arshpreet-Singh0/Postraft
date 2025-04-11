// components/TwitterConnectButton.tsx
"use client";

import { BACKEND_URL, TWITTER_CLIENT_ID } from "@/config/config";
import { useAuth } from "@clerk/nextjs";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import { Pricing } from "@/components/home/Pricing";

export default function TwitterConnectButton() {
  // const [accounts, setAccounts] = useState<{name : string, username : string, twitterId : string, expiresAt : number}[]>([]);
  // const {data : session } = useSession();
  // const { getToken } = useAuth();
  // const [text, setText] = useState("");
  // const [msg, setMsg] = useState("");
  // const handleConnect = async () => {
    
  //   const token = await getToken(); // from @clerk/nextjs

  //   window.location.href = `${BACKEND_URL}/api/v1/twitter/login?token=${token}`;


  // };

  // useEffect(()=>{
  //   const getAccounts = async()=>{
  //     const token = await getToken();
  //     if(!token) return;
  //     try {
  //       const res = await axios.get(`${BACKEND_URL}/api/v1/twitter/linked-accounts`,{
  //         headers : {
  //           Authorization :  `Bearer ${token}`
  //         }
  //       });

  //       setAccounts(res?.data);
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   };
  //   getAccounts();
  // },[]);

  // const handlePost = async()=>{
  //   if(!text) return;
  //   const token = await getToken();
  //   try {
  //     const res = await axios.post(`${BACKEND_URL}/api/v1/twitter/post`, {text}, {
  //       headers : {
  //         Authorization : `Bearer ${token}`
  //       }
  //     });

  //     console.log(res);
      

  //     setMsg(res?.data?.message);
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  return (
    <>
    {/* <p className="text-center text-2xl font-bold mb-4">
      {session?.user ? <>
      "Connected to Twitter"
      Username: {session?.user.name}
      </> : "Connect your Twitter account"}
    </p>
    <button
      onClick={handleConnect}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Connect Twitter Account
    </button>



    <p className="text-red-600">{msg && `${msg}`}</p>


    <div className="mt-10 border border-white text-black">
        {
          accounts.map((acc, idx)=>(
            <div className="" key={idx}>
              <p>Username: {acc.username}</p>
              <p>Name: {acc.name}</p>
              <p>Expires at : {acc.expiresAt}</p>


              <textarea className="border border-black text-black" value={text} onChange={(e)=>setText(e.target.value)} rows={5} cols={100}></textarea> <br />

              <button className="m-5 bg-red-500 p-2 rounded-md" onClick={handlePost}>POST TWEET</button>
            </div>
          ))
        }
    </div> */}

    <HeroSection />
    <HowItWorks />
    <Pricing />

    </>
  );
}
