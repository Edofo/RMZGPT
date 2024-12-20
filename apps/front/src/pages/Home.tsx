import { AuthGuard } from "@/components/AuthGuard";
import { ChatWindow } from "@/components/design/home/ChatWindow";
import { MessageInput } from "@/components/design/home/MessageInput";
import { Sidebar } from "@/components/design/home/Sidebar";

export const HomePage = () => {
  return (
    <>
      <Sidebar />
      <main className="relative flex h-full w-full flex-col">
        <ChatWindow />
        <div className="absolute right-0 bottom-0 left-0">
          <MessageInput />
        </div>
      </main>
    </>
  );
};

const AuthHomePage = () => {
  return <AuthGuard render={() => <HomePage />} />;
};

export default AuthHomePage;
