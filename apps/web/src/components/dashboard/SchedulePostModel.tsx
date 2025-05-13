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
import { Textarea } from "../ui/textarea"
import axiosInstance from "@/config/axios"
import { useAuth } from "@clerk/nextjs"
import { handleAxiosError } from "@/utils/handleAxiosError"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const TWITTER_CHAR_LIMIT = 280;

const SchedulePostModel = ({ twitterId, username }: { twitterId: string, username :string }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [minDateTime, setMinDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const {getToken} = useAuth();

  // Update minimum date-time whenever dialog opens
  useEffect(() => {
    if (open) {
      const now = new Date();
      now.setSeconds(0, 0); // remove seconds/milliseconds for compatibility
      const formatted = now.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
      setMinDateTime(formatted);
    }
  }, [open]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= TWITTER_CHAR_LIMIT) {
      setContent(e.target.value);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const newText = (content + pastedText).slice(0, TWITTER_CHAR_LIMIT);
    setContent(newText);
  };

  const handleSave = async() => {
    if (!content || !time) {
      alert("Please fill in both content and schedule time.");
      return;
    }
    setLoading(true);

    const scheduledTime = new Date(time);
    const now = new Date();
    if (scheduledTime <= now) {
      alert("Please select a future date and time.");
      return;
    }

    console.log("Scheduled Content:", { content, scheduledTime, twitterId });
    // TODO: Send to backend here

    

    try {
        const token = await getToken();
        const res = await axiosInstance.post('/twitter/schedule',{content, scheduledTime, twitterAccountId : twitterId}, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        if(res?.data?.success){
            toast.success(res?.data?.message);

            setOpen(false);
        }
    } catch (error) {
        handleAxiosError(error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer">
          Schedule a post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
          <DialogDescription>
            Add content and future time. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-w-[425px]">
          {/* Content */}
          <div className="max-w-[375px]">
            <Label htmlFor="content" className="text-right">Content</Label>
            <Textarea
              id="content"
              className="bg-white/10 mt-2 h-32 break-words"
              value={content}
              onChange={handleContentChange}
              onPaste={handlePaste}
              cols={15}
            />
            <div className="text-sm text-gray-400 mt-1 text-right">
              {content.length}/{TWITTER_CHAR_LIMIT}
            </div>
          </div>

          {/* Username */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input
              id="username"
              value={`@${username}`}
              readOnly
              className="col-span-3 bg-white/10 text-white"
            />
          </div>

          {/* Schedule Time */}
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
          <Button type="button" onClick={handleSave} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer flex justify-center items-center" disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2" size={18}/>} Schedule Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulePostModel;
