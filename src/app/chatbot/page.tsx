import ChatbotComponent from "@/components/ChatbotComponent";
import Header from "@/components/Header";

const ChatbotPage = () => {
    return (
        <div className="min-h-screen bg-slate-800 justify-center items-center">
            <Header />
            <ChatbotComponent />
        </div>
    );
}

export default ChatbotPage;