import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight} from "lucide-react";

export function HeroSection() {
  return (
    <div className="h-96 mt-5">
      <div className="p-5 flex justify-center gap-5">
        <Badge className="px-4 py-2 rounded-full dark:bg-purple-500/10 dark:text-purple-300 text-sm font-medium flex items-center gap-2 border dark:border-purple-600/20 bg-purple-600/10 text-purple-500 border-purple-700/20">
       Schedule Your posts with ease
        </Badge>
        <Badge className="px-4 py-2 rounded-full dark:bg-pink-500/10 dark:text-pink-300 text-sm font-medium flex items-center gap-2 border dark:border-purple-600/20 bg-pink-600/10 text-pink-500 border-purple-700/20">
          Auto generate posts
        </Badge>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6 ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight text-center text-white">
          <span className="block">Smart Post Scheduling</span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Powered by AI.
          </span>
        </h1>
      </div>

      <div className="flex items-center justify-center">
  <Link href="/pricing" className="block">
  <Button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white hover:opacity-90 transition rounded-full">
  <span className="px-2 py-3.5 flex justify-center items-center gap-4">Get Started Now <ArrowRight /></span>
</Button>

  </Link>
  
</div>

    </div>
  );
}
