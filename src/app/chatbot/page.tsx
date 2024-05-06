import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import OpenAI from 'openai';
import React from 'react';
import { saveUserMessage, saveBotMessage } from '@/utils/utils';
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export type User = {
    name: string;
    email: string;
    image: string;
}

const ChatbotPage = async () => {
    const session = await getServerSession(authConfig);

    if (!session) return redirect("/");
    const user = session.user as User;

    const handleMessage = async (message: string) => {
        'use server';
        await saveUserMessage(user.email, message);
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo",
        });
        const botMessage = completion.choices[0].message.content as string;
        await saveBotMessage(botMessage);
        return botMessage;
    };

    return (
        <div className="min-h-screen bg-slate-800 justify-center items-center">
            <Header user={user} />
            <div className="py-8 flex justify-center">
                <Chatbot
                    sendMessageCallback={handleMessage} />
            </div>
        </div>
    );
}

export default ChatbotPage;