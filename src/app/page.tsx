import LoginComponent from "./components/LoginComponent";

export default function Home() {
  return (
    <main className="app">
      <p className="text-3xl font-bold">GenAI Chatbot</p>
      <LoginComponent />
    </main>
  );
}
