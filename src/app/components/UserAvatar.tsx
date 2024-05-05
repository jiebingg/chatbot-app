import { useSession } from "next-auth/react";

const UserAvatar = () => {
    const { data: session } = useSession();

    return (
        <div className="avatar-container ml-3.5">
            <img src={session?.user?.image as string} />
        </div>
    )
}

export default UserAvatar;