'use client';

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Header = () => {
    const { data: session } = useSession();

    if (!session) return redirect("/");

    return (session &&
        <div className="flex flex-row justify-between py-4 border-b-2 border-b-neutral-700 items-center">
            <p className="ml-8 my-2 text-2xl font-bold">
                Hello, {session?.user?.name}
            </p>
            <button className="px-4 py-2 mr-6 my-2 bg-sky-600 hover:bg-sky-800 text-white font-bold rounded"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>)
}

export default Header;