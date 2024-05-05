import OpenAI from 'openai';
import React from 'react';
import { useSession } from "next-auth/react";
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { isEmpty } from '../utils/utils';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { data: session } = useSession();
  const handleMessage = async (message) => {
    if (!isEmpty(message)) {
      try {
        await sql`INSERT INTO chats (sender, message) VALUES (${session.user.email}, ${message});`;
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
      });

      const receivedMessage = completion.choices[0].message.content;
      try {
        await sql`INSERT INTO chats (sender, message) VALUES ('bot', ${receivedMessage});`;
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
      const botMessage = createChatBotMessage(receivedMessage);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleMessage },
        });
      })}
    </div>
  );
};

export default ActionProvider;