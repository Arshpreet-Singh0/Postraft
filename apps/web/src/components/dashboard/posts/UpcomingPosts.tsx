"use client";

import Loading from "@/components/Loading";
import axiosInstance from "@/config/axios";
import { Post } from "@/types/types";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useAuth } from "@clerk/nextjs";
import { UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

const UpcomingPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
  
    useEffect(() => {
      const fetchPublishedPosts = async () => {
        try {
          const token = await getToken();
          const res = await axiosInstance.get("/twitter/upcoming", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setPosts(res?.data);
        } catch (error) {
          handleAxiosError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPublishedPosts();
    }, []);
  
  if(loading){
    return <Loading />
  }
  return (
    <div className="mt-10 rounded-lg text-white p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Upcoming Posts </h2>
      </div>

      <div>
        {posts?.length > 0 ? (
          posts.map((post, idx) => (
            <div className="bg-white/5 p-5 rounded-lg mt-4 flex" key={idx}>
              <div className="w-[80%]">
              <h4>Post {idx+1} : </h4>
              <p>{post.content}</p>

              <p className="text-sm text-zinc-400 mt-2">
                Scheduled At :{" "}
                {new Date(post.scheduledTime).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
              </div>
              
              <div className="flex-1">
                <h2 className="text-zinc-400">Account details</h2>

                <p className="text-zinc-300 flex items-center"><UserCheck size={18} className="mr-2"/> {post?.TwitterAccount.username}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 flex justify-center items-center">
            <p className="text-lg font-bold text-center">
              No pending posts.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingPosts