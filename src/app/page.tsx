import LoginButton from "../components/LoginButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-800 flex flex-col justify-center items-center">
      <p className="text-3xl font-bold">GenAI Chatbot</p>
      <LoginButton />
    </main>
  );
}
