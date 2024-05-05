'use client';

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserAvatar from "./UserAvatar";

const Header = () => {
    const { data: session } = useSession();

    if (!session) return redirect("/");

    return (session &&
        <div className="flex flex-row justify-between py-4 border-b-2 border-b-neutral-700 items-center">
            <div className="ml-8 my-2 text-xl font-semibold flex flex-row items-center">
                <UserAvatar />
                {session?.user?.name}
            </div>
            <button className="px-4 py-2 mr-6 my-2 bg-sky-600 hover:bg-sky-800 text-sm text-white font-semibold rounded"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>)
}

export default Header;