import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hello! I am GenAI bot.`)],
  botName: 'GenAI bot',
};

export default config;