import OpenAI from 'openai';
import React from 'react';
import { useSession } from "next-auth/react";
import { isEmpty, saveUserMessage, saveBotMessage } from '@/utils/utils';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  const { data: session } = useSession();
  const handleMessage = async (message) => {
    if (!isEmpty(message)) {
      await saveUserMessage(session.user.email, message);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
      });
      const botMessage = completion.choices[0].message.content;
      await saveBotMessage(botMessage);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, createChatBotMessage(botMessage)],
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