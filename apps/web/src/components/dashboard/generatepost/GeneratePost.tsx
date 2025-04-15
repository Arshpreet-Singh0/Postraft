"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "@/config/axios";
import { useAuth } from "@clerk/nextjs";
import { Clipboard, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ScheduleGeneartedPostModel from "./ScheduledPost";
interface Message {
  text: string;
  sender: "Ai" | "User";
}

const GeneratePost = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>(
    JSON.parse(localStorage.getItem("chats") || "[]") || []
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { getToken } = useAuth();

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const history = messages.map((msg, idx) => ({
      role: msg.sender === "User" ? "user" : "model",
      parts: [{text : msg.text}],
    }));

    console.log(history);

    const userMsg: Message = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      setLoading(true);
      const token = await getToken();

      const res = await axiosInstance.post(
        "/generate",
        { input, history },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 50000,
        }
      );

      console.log(res);

      const aiResponse: Message = {
        sender: "Ai",
        text: res.data || "Sorry, I couldn't generate a post for that.",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Ai",
          text: "⚠️ Something went wrong while generating the post.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(messages));
  }, [messages]);

  // useEffect(() => {
  //   if (messages.length == 0) {
  //     setMessages([
  //       {
  //         sender: "Ai",
  //         text: "👋 Hi! I’m your AI-powered Post Generator. Tell me what you want to post about, and I’ll create a compelling social media post for you!",
  //       },
  //     ]);
  //   }
  // }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  return (
    <div className="rounded-lg text-white p-5 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-serif">
          Generate and Auto-Schedule Post with AI
        </h2>
      </div>

      <div className="flex gap-6 h-[80%]">
        {/* Left: Chat-style interface */}
        <div className="lg:w-2/3 w-full rounded-lg bg-white/5 flex flex-col border-zinc-500">
          {/* Scrollable messages container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.length === 0 ? (
              <p className="text-gray-400">Start typing your idea below...</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "Ai" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.sender === "Ai"
                        ? "bg-white/10 w-full"
                        : "bg-white/5 max-w-[70%] text-right"
                    }`}
                  >
                    {msg.text}

                    {msg.sender == "Ai" && (
                      <div className="flex items-center justify-end text-sm text-gray-400 mt-1">
                        <button
                          className=" p-1 rounded-md"
                          onClick={() => copyToClipboard(msg.text)}
                        >
                          <Clipboard
                            size={15}
                            className="hover:text-white cursor-pointer"
                          />
                        </button>
                        <div >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 rounded cursor-pointer">
                                <EllipsisVertical className="h-5 w-5 hover:text-white" />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              className="w-40 bg-black text-white"
                              align="start"
                            >
                              <DropdownMenuItem onClick={() => setOpen(true)}>
                                Schedule this post
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => console.log("Edit clicked")}
                              >
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                // onClick={handleDeleteScheduledPost}
                                className="text-red-600 focus:text-red-700"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <ScheduleGeneartedPostModel open={open} setOpen={setOpen} content={msg.text} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="bg-white/10 p-3 rounded-lg w-full animate-pulse text-sm">
                Generating response...
              </div>
            )}
          </div>

          {/* Fixed input at bottom */}
          <div className="p-4 bg-white/10 flex items-center gap-2 rounded-b-lg">
            <Textarea
              className="flex-1 bg-white/10 text-white resize-none rounded-lg"
              rows={2}
              placeholder="Type your post idea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              disabled={loading}
            >
              Generate
            </Button>
          </div>
        </div>

        {/* <div className="w-1/2 border rounded-lg bg-white/5 p-4">
          {/* Reserved for generated output or additional features */}
        {/* </div>  */}
      </div>
    </div>
  );
};

export default GeneratePost;
