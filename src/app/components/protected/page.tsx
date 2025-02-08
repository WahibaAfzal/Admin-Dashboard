





// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (!isLoggedIn) {
//       router.push("/admin");
//     }
//   }, [router]);

//   return <>{children}</>;
// }





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures localStorage is accessed only on the client

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.replace("/admin"); // Use replace instead of push to avoid history stacking
    }
  }, [router]);

  if (!isMounted) return null; // Prevents hydration errors

  return <>{children}</>;
}
