"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "@/config/axios";
import { Post } from "@/types/types";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useAuth } from "@clerk/nextjs";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import EditPostModel from "./EditModel";
import { useState } from "react";

const Options = ({
  post,
  setPosts,
  id,
}: {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  id: string;
  post: Post;
}) => {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  const handleDeleteScheduledPost = async () => {
    try {
      const token = await getToken();
      const res = await axiosInstance.delete(`/twitter/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.success) {
        setPosts((p) => {
          return p.filter((post) => post.id !== res.data.post?.id);
        });

        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);

      handleAxiosError(error);
    }
  };
  return (
    <div className="flex-1 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded cursor-pointer">
            <EllipsisVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 bg-black text-white" align="start">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteScheduledPost}
            className="text-red-600 focus:text-red-700"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditPostModel
        postId={post.id}
        username={post?.TwitterAccount?.username}
        content={post.content}
        scheduledTime={post?.scheduledTime?.toLocaleString()}
        open={open}
        setOpen={setOpen}
        setPosts={setPosts}
      />
    </div>
  );
};

export default Options;
