"use client";

import axiosInstance from "@/config/axios";
import { Post } from "@/types/types";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const UpcomingPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
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
  
    console.log(posts);
  return (
    <div>

    </div>
  )
}

export default UpcomingPosts