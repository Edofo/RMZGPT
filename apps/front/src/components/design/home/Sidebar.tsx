import { ChevronRight, LogOut, Menu, MessageSquare, X } from "lucide-react";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChat } from "@/contexts/ChatContext";

export const Sidebar = () => {
  const { setRoom } = useChat();

  const chats = [{ id: "1", name: "Chat 1" }];

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed top-2 right-2 z-30 rounded-full bg-blue-600 bg-opacity-80 p-2 text-white backdrop-blur-lg md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-72 transform bg-white bg-opacity-10 p-4 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 `}
      >
        <Popover>
          <PopoverTrigger asChild>
            <div className="mb-6 flex cursor-pointer items-center gap-2 rounded bg-white bg-opacity-0 py-2 transition-colors hover:bg-opacity-30">
              <img
                src="https://i.pravatar.cc/300"
                alt="Webchat"
                className="h-14 w-14 rounded-full"
              />
              <div className="flex w-full items-center justify-between ">
                <p className="text-center font-bold text-white text-opacity-80">
                  {"Test"}
                </p>
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg bg-white bg-opacity-10 p-2 shadow-md backdrop-blur-lg">
            <button
              type="button"
              // onClick={logout}
              className="flex w-full items-center gap-2 rounded-lg bg-white bg-opacity-0 p-3 text-left text-whit text-white transition-colors hover:bg-opacity-30 focus:outline-none "
            >
              <LogOut className="h-5 w-5" />
              Se déconnecter
            </button>
          </PopoverContent>
        </Popover>
        <h2 className="mb-1 flex items-center justify-between font-bold text-2xl text-white">
          Chats
        </h2>
        <div>
          <ul className="mt-2 space-y-2">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => {
                    setRoom({ id: chat.id, name: chat.name });
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center space-x-2 rounded-lg bg-white bg-opacity-20 p-3 text-left text-white transition-colors hover:bg-opacity-30"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{chat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
          onKeyDown={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};
