import { useSession } from "next-auth/react";

const UserAvatar = () => {
    const { data: session } = useSession();

    return (
        <div className="mx-4 overflow-hidden rounded-full max-w-[40px] max-h-[40px]">
            <img src={session?.user?.image as string} />
        </div>
    )
}

export default UserAvatar;