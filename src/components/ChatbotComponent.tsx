'use client';

import config from "../app/chatbot-config/config";
import ActionProvider from "../app/chatbot-config/ActionProvider";
import MessageParser from "../app/chatbot-config/MessageParser";
import 'react-chatbot-kit/build/main.css';
import { Chatbot } from 'react-chatbot-kit';

const ChatbotComponent = () => {
    return (
        <div className="pt-12 pb-12 flex justify-center text-black">
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider} />
        </div>
    )
}

export default ChatbotComponent;