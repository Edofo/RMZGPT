import { ChatProvider } from "@/contexts/ChatContext";
import HomePage from "@/pages/Home";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  it("should render the sidebar, chat window, and message input", () => {
    render(
      <ChatProvider>
        <HomePage />
      </ChatProvider>,
    );

    expect(
      screen.getByRole("button", { name: /toggle sidebar/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Chats")).toBeInTheDocument();
    expect(screen.getByText("Chat 1")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type a message..."),
    ).toBeInTheDocument();

    // click on the first chat
    screen.getByText("Chat 1").click();
  });
});
