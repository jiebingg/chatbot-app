'use client'

import config from "../chatbot-config/config";
import ActionProvider from "../chatbot-config/ActionProvider";
import MessageParser from "../chatbot-config/MessageParser";
import 'react-chatbot-kit/build/main.css';
import { Chatbot } from 'react-chatbot-kit';

const ChatbotComponent = () => {
    return (
        <div className="chatbot-container">
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider} />
        </div>)
}

export default ChatbotComponent;