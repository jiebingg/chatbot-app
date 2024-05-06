type UserAvatarProps = {
    imageLink: string;
};

const UserAvatar = ({ imageLink }: UserAvatarProps) => {
    return (
        <div className="mx-4 overflow-hidden rounded-full max-w-[40px] max-h-[40px]">
            <img src={imageLink} />
        </div>
    )
}

export default UserAvatar;