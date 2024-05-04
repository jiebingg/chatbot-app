'use client'

import config from "../chatbot-config/config";
import ActionProvider from "../chatbot-config/ActionProvider";
import MessageParser from "../chatbot-config/MessageParser";
import 'react-chatbot-kit/build/main.css';
import { Chatbot } from 'react-chatbot-kit';
import { useSession } from "next-auth/react";

const ChatbotComponent = () => {
    const { data: session } = useSession();

    return (
        <div>
            <div>
                <h1>Hello, {session?.user?.name}</h1>
            </div>
            <div className="chatbot-container">
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider} />
            </div>
        </div>)
}

export default ChatbotComponent;