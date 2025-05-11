"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="z-50 w-full bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto md:max-w-6xl    px-4 sm:px-6 lg:px-8 backdrop-blur-xl rounded-2xl mt-5 bg-background/10 border border-neutral-300 dark:border-neutral-900 shadow-lg"
      >
        <div className="flex h-16 items-center justify-between text-white">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center space-x-1 transition-opacity hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="font-bold font-mono text-xl hidden sm:inline-block text-white">
                PostRaft
              </span>
              <span className="font-bold font-mono text-xl sm:hidden">PxR</span>
            </Link>
          </motion.div>

          {/* Auth & Navigation */}
          <div className="flex items-center md:gap-4 gap-2">
            <SignedIn>
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                asChild
              >
                <Link href="/purchases">My Purchases</Link>
              </Button>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/30",
                    userButtonPopover: "right-0 mt-2",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                asChild
              >
                <Link href="/pricing">Pricing</Link>
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="relative overflow-hidden bg-gradient-to-r from-neutral-800 to-neutral-900 text-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg shadow-md shadow-neutral-800/20 dark:shadow-black/30 px-4 py-2 font-medium tracking-wide transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:from-neutral-700 hover:to-neutral-900 dark:hover:from-neutral-600 dark:hover:to-neutral-750"
                  asChild
                >
                  <SignInButton mode="modal">
                    <span className="cursor-pointer">Sign In</span>
                  </SignInButton>
                </Button>
              </motion.div>
            </SignedOut>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
