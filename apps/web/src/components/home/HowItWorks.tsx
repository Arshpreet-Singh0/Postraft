const HowItWorks = () => {
  return (
    <div className="text-white ">
      <div className="w-[70%] mx-auto">
        <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-white">
        How it works
          </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
          <div className="space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex justify-center items-center h-1/3">
              <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-check-icon lucide-calendar-check"
                >
                  <path d="M5.5 20H8" />
                  <path d="M17 9h.01" />
                  <rect width="10" height="16" x="12" y="4" rx="2" />
                  <path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
                  <circle cx="17" cy="15" r="1" />
                </svg>
              </div>
            </div>

            <h1 className="font-semibold text-xl">Smart Scheduling</h1>

            <p className="opacity-60 text-sm">
              Schedule posts ahead of time with our intelligent timing optimizer
            </p>
          </div>
          <div className="space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex justify-center items-center h-1/3">
              <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-check-icon lucide-calendar-check"
                >
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
                  <path d="m14 7 3 3" />
                  <path d="M5 6v4" />
                  <path d="M19 14v4" />
                  <path d="M10 2v2" />
                  <path d="M7 8H3" />
                  <path d="M21 16h-4" />
                  <path d="M11 3H9" />
                </svg>
              </div>
            </div>

            <h1 className="font-semibold text-xl">AI Content Generation</h1>

            <p className="opacity-60 text-sm">
              Generate engaging content with our advanced AI writing assistant
            </p>
          </div>
          <div className="space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex justify-center items-center h-1/3">
              <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-check-icon lucide-calendar-check"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
            </div>

            <h1 className="font-semibold text-xl">Auto-Posting</h1>

            <p className="opacity-60 text-sm">
              Set it and forget it with our automated posting system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
