// components/TwitterConnectButton.tsx
"use client";

import { signIn } from "next-auth/react";

export default function TwitterConnectButton() {
  const handleConnect = () => {
    signIn("twitter", {
      callbackUrl: "/dashboard", // where to go after Twitter auth
    });
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Connect Twitter Account
    </button>
  );
}
