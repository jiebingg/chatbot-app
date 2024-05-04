'use client'

import { signIn, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

const LoginComponent = () => {

    const { data: session } = useSession();
    console.log("Session: ", session);

    const handleClick = () => {
        signIn("google");
    };

    if (session) return redirect("/chatbot");

    return (
        <div>
            <button
                onClick={handleClick}
                className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
            >
                <span className="ml-4">Continue with Google</span>
            </button>
        </div>
    );
}

export default LoginComponent;