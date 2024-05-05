'use client';

import { FormEvent, useState } from "react";
import TypingAnimation from "../components/TypingAnimation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isEmpty } from "@/utils/utils";

export enum MessageType {
    USER,
    BOT,
}

export interface MessageObject {
    type: MessageType;
    message: string;
}

export type ChatProps = {
    sendMessageCallback: (user: string, message: string) => Promise<string>;
};

const ChatbotComponent = ({ sendMessageCallback }: ChatProps) => {
    const INITIAL_BOT_MESSAGE = 'Hello! Ask me anything';
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState<MessageObject[]>([{ type: MessageType.BOT, message: INITIAL_BOT_MESSAGE }]);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    if (!session) return redirect("/");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setChatLog((prevChatLog) => [...prevChatLog, { type: MessageType.USER, message: inputValue }])
        sendMessage(inputValue);
        setInputValue('');
    }

    const sendMessage = async (message: string) => {
        setIsLoading(true);
        const botMessage = await sendMessageCallback(session?.user?.email as string, message);
        setChatLog((prevChatLog) => [...prevChatLog, { type: MessageType.BOT, message: botMessage }])
        setIsLoading(false);
    }

    return (
        <div className="mx-auto w-[85vw] h-[80vh]">
            <div className="flex flex-col h-full bg-gray-900">
                <div className="overflow-scroll p-6">
                    <div className="flex flex-col space-y-4">
                        {
                            chatLog.map((message, index) => (
                                <div key={index} className={`flex ${message.type === MessageType.USER ? 'justify-end' : 'justify-start'
                                    }`}>
                                    <div className={`${message.type === MessageType.USER ? 'bg-sky-500' : 'bg-gray-800'
                                        } rounded-lg p-4 text-white max-w-[75%] w-auto`}>
                                        {message.message}
                                    </div>
                                </div>
                            ))
                        }
                        {
                            isLoading &&
                            <div key={chatLog.length} className="flex justify-start">
                                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                                    <TypingAnimation />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-none p-3 pt-1">
                    <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                        <button type="submit"
                            disabled={isEmpty(inputValue)}
                            className="bg-sky-600 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-sky-800 transition-colors duration-300
                            disabled:bg-blue-300 disabled:shadow-none">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatbotComponent;