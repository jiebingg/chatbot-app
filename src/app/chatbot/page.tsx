import ChatbotComponent from "@/components/ChatbotComponent";
import Header from "@/components/Header";
import OpenAI from 'openai';
import React from 'react';
import { saveUserMessage, saveBotMessage } from '@/utils/utils';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const handleMessage = async (userEmail: string, message: string) => {
    'use server';
    await saveUserMessage(userEmail, message);
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
    });
    const botMessage = completion.choices[0].message.content as string;
    await saveBotMessage(botMessage);
    return botMessage;
};

const ChatbotPage = () => {
    return (
        <div className="min-h-screen bg-slate-800 justify-center items-center">
            <Header />
            <div className="py-8 flex justify-center">
                <ChatbotComponent
                    sendMessageCallback={handleMessage} />
            </div>
        </div>
    );
}

export default ChatbotPage;