


// "use client"

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


// export default function ProtectedRoute({children} : {children : React.ReactNode}){
//     const router = useRouter()

//     useEffect(() => {
//         const isLoggedIn = localStorage.getItem("isLoggedIn")
//         if (!isLoggedIn) {
//             router.push("/admin")
//         }

//     },[router])

//     return <>
//     {children}
//     </>
// }






"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  return <>{children}</>;
}
