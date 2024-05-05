import { createChatBotMessage } from 'react-chatbot-kit';
import UserAvatar from '../components/UserAvatar';
import ChatbotAvatar from '../components/ChatbotAvatar';

const config = {
  initialMessages: [createChatBotMessage(`Hello! Ask me anything.`)],
  botName: 'GenAI chatbot',
  customComponents: {
    // Replaces the default bot avatar
    botAvatar: () => <ChatbotAvatar />,
    // Replaces the default user icon
    userAvatar: () => <UserAvatar />,
  },
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#0EA5E9",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#0EA5E9",
    },
  }
};

export default config;