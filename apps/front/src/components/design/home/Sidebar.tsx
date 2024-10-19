import { ChevronRight, LogOut, Menu, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (chats.length) {
      const { id, name } = chats[0];
      setRoom({ id, name });
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 rounded-md bg-gray-800 p-2 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 p-6 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <div className="mb-6 flex cursor-pointer items-center gap-2 rounded-md bg-gray-800 px-3 py-2 transition-colors hover:bg-gray-700">
              <img
                src="https://i.pravatar.cc/300"
                alt="Webchat"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex w-full items-center justify-between">
                <p className="font-medium text-gray-200 text-sm">Test</p>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-md bg-gray-800 p-2 shadow-lg">
            <button
              type="button"
              // onClick={logout}
              className="flex w-full items-center gap-2 rounded-md bg-gray-700 p-2 text-left text-gray-200 text-sm transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </PopoverContent>
        </Popover>
        <h2 className="mb-4 font-semibold text-gray-200 text-lg">Chats</h2>
        <div>
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => {
                    setRoom({ id: chat.id, name: chat.name });
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md bg-gray-800 p-2 text-left text-gray-200 text-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{chat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
          onKeyDown={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};
