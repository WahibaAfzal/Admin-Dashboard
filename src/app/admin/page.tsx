import { useRouter } from "next/navigation";
import { useState } from "react";

export default function adminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (email === "yesharafzal2020@gmail.com") {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/admin/dashboard");
  } else {
    alert(" Invalid email or password");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        ></input>

        <input
          type="email"
          placeholder="Email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        ></input>
        <button type="submit" className="bg-red-300 text-white px-4 py-2 rounded w-full">
            Login
        </button>
      </form>
    </div>
  );
}
