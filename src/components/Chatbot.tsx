'use client';

import { FormEvent, useEffect, useRef, useState } from "react";
import TypingAnimation from "./TypingAnimation";
import { isEmpty } from "@/utils/utils";

export enum MessageType {
    USER,
    BOT,
}

export interface MessageObject {
    type: MessageType;
    message: string;
}

export type ChatbotProps = {
    sendMessageCallback: (message: string) => Promise<string>;
};

const Chatbot = ({ sendMessageCallback }: ChatbotProps) => {
    const INITIAL_BOT_MESSAGE = 'Hello! Ask me anything';
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<MessageObject[]>([{ type: MessageType.BOT, message: INITIAL_BOT_MESSAGE }]);
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLInputElement>(null);

    const scrollTobottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollTobottom();
    }, [messages]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentMessage = inputValue;
        setInputValue('');
        setMessages((prevMessages) => [...prevMessages, { type: MessageType.USER, message: currentMessage }])
        setIsLoading(true);
        const botMessage = await sendMessageCallback(currentMessage);
        setMessages((prevMessages) => [...prevMessages, { type: MessageType.BOT, message: botMessage }])
        setIsLoading(false);
    }

    return (
        <div className="mx-auto w-[85vw] h-[80vh] text-white">
            <div className="h-full bg-gray-900 flex flex-col">
                <div className="overflow-scroll h-full p-6">
                    <div className="flex flex-col space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.type === MessageType.BOT ? 'justify-start' : 'justify-end'}`}>
                                <div className={`${message.type === MessageType.BOT ? 'bg-gray-800' : 'bg-sky-500'} rounded-lg px-3.5 py-2 max-w-[75%] w-auto`}>
                                    {message.message}
                                </div>
                            </div>
                        ))}
                        {isLoading &&
                            (<div key={messages.length} className="flex justify-start">
                                <div className="bg-gray-800 rounded-lg px-3.5 py-4 max-w-sm">
                                    <TypingAnimation />
                                </div>
                            </div>)
                        }
                    </div>
                    <div ref={messageEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex-none p-3 pt-1">
                    <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                        <input type="text"
                            className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                        <button type="submit"
                            disabled={isEmpty(inputValue)}
                            className="bg-sky-600 rounded-lg px-4 py-2 font-semibold hover:bg-sky-800 disabled:bg-blue-300 disabled:shadow-none">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chatbot;