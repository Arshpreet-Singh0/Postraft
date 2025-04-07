'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { BACKEND_URL } from '@/config/config';

export default function SyncUser() {
  const { isSignedIn } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    let isMounted = true;
  
    const sync = async (retries = 2) => {
      if (!isMounted) return;
  
      try {
        const res = await fetch(`${BACKEND_URL}/api/me`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
  
        const data = await res.json();
        console.log("✅ User synced:", data.user);
        if (isMounted) setSynced(true);
      } catch (err) {
        console.error("❌ Error syncing user:", err);
        if (retries > 0 && isMounted) {
          setTimeout(() => sync(retries - 1), 1000);
        }
      }
    };
  
    if (isSignedIn && !synced) {
      sync();
    }
  
    return () => {
      isMounted = false;
    };
  }, [isSignedIn, synced]);
  

  return null;
}
