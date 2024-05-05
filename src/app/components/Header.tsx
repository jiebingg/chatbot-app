'use client';

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Header = () => {
    const { data: session } = useSession();

    if (!session) return redirect("/");

    return (session &&
        <div className="flex flex-row justify-between">
            <p className="px-4 py-4 text-3xl font-bold">
                Hello, {session?.user?.name}
            </p>
            <button className="px-4 py-2 mr-5 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>)
}

export default Header;