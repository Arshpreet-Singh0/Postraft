"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axiosInstance from "@/config/axios"
import { useAuth } from "@clerk/nextjs"
import { handleAxiosError } from "@/utils/handleAxiosError"
import { toast } from "sonner"
import { Post } from "@/types/types"

const TWITTER_CHAR_LIMIT = 280;

const EditPostModel = ({
  open,
  setOpen,
  postId,
  username,
  content: initialContent,
  scheduledTime: initialScheduledTime,
  setPosts
}: {
  open : boolean,
  setOpen :  React.Dispatch<React.SetStateAction<boolean>>,
  postId: string,
  username: string,
  content: string,
  scheduledTime: string,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  
  const [content, setContent] = useState(initialContent)
  const [time, setTime] = useState("")
  const [minDateTime, setMinDateTime] = useState("")
  const { getToken } = useAuth()

  useEffect(() => {
    if (open) {
      // Set content and time
      setContent(initialContent);
  
      const localScheduled = new Date(initialScheduledTime);
      const formattedScheduled = localScheduled.toISOString().slice(0, 16); // temporarily use this, then override below
  
      const offsetMs = localScheduled.getTimezoneOffset() * 60000;
      const localISOTime = new Date(localScheduled.getTime() - offsetMs).toISOString().slice(0, 16);
      setTime(localISOTime);
  
      const now = new Date();
      now.setSeconds(0, 0);
      const nowOffsetMs = now.getTimezoneOffset() * 60000;
      const localMinISOTime = new Date(now.getTime() - nowOffsetMs).toISOString().slice(0, 16);
      setMinDateTime(localMinISOTime);
    }
  }, [open, initialContent, initialScheduledTime]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= TWITTER_CHAR_LIMIT) {
      setContent(e.target.value)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData("text")
    const newText = (content + pastedText).slice(0, TWITTER_CHAR_LIMIT)
    setContent(newText)
  }

  const handleUpdate = async () => {
    if (!content || !time) {
      alert("Please fill in both content and schedule time.")
      return
    }

    const scheduled = new Date(time)
    const now = new Date()
    if (scheduled <= now) {
      toast.error("Please select a future date and time.")
      return
    }

    try {
      const token = await getToken()
      const res = await axiosInstance.put(`/twitter/post/${postId}`, {
        content,
        scheduledTime: scheduled
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Post updated successfully!");
        const post = res?.data?.post;
        setPosts((p)=>(
            p.map((item) => item.id === post.id ? post : item)
        ));
        setOpen(false);
      }
    } catch (error) {
      handleAxiosError(error)
    }
  }

  if(!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="text-white bg-none hover:text-black">
          Edit Post
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit Scheduled Post</DialogTitle>
          <DialogDescription>
            Update your post content or change the scheduled time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              className="bg-white/10 mt-2 h-32"
              value={content}
              onChange={handleContentChange}
              onPaste={handlePaste}
            />
            <div className="text-sm text-gray-400 mt-1 text-right">
              {content.length}/{TWITTER_CHAR_LIMIT}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input
              id="username"
              value={`@${username}`}
              readOnly
              className="col-span-3 bg-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scheduleTime" className="text-right">Time</Label>
            <Input
              id="scheduleTime"
              type="datetime-local"
              className="col-span-3 bg-white/10 text-white"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min={minDateTime}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleUpdate} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            Update Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostModel
