import ChatbotComponent from "../components/ChatbotComponent";

interface User {
    id: string;
    name: string;
}

const ChatbotPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json() as User[];
    return (
        <div>
            <h1>Users Page</h1>
            <ChatbotComponent />
        </div>
    );
}

export default ChatbotPage;