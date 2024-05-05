import chatbotIcon from "@/../public/chatbot-icon.png";
import Image from "next/image";

const ChatbotAvatar = () => {
    return (
        <div className="avatar-container">
            <Image src={chatbotIcon} width={40} height={40} alt="chatbot-avatar" />
        </div>
    )
}

export default ChatbotAvatar;