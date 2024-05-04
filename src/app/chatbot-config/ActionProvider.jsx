import OpenAI from 'openai';
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleMessage = async (message) => {
    // const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    const openai = new OpenAI({
      apiKey: 'sk-proj-ExYckuBgu7PWpp9SnZ0LT3BlbkFJI1G1JAjTOpi01QhkLjTg',
      dangerouslyAllowBrowser: true
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    const botMessage = createChatBotMessage(completion.choices[0].message.content);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
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