'use client'

import Image from "next/image";
import googleLogo from "@/../public/google.png";
import { signIn, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

const LoginButton = () => {

    const { data: session } = useSession();

    const handleClick = () => {
        signIn("google");
    };

    if (session) return redirect("/chatbot");

    return (
        <div>
            <button
                onClick={handleClick}
                className="w-full flex items-center font-semibold justify-center h-12 px-4 mt-4 text-l transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
            >
                <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
                <span className="ml-2">Continue with Google</span>
            </button>
        </div>
    );
}

export default LoginButton;