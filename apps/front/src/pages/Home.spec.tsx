import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "./Home";

vi.mock("@/components/design/home/Sidebar", () => ({
  Sidebar: () => <div>Sidebar</div>,
}));

vi.mock("@/components/design/home/ChatWindow", () => ({
  ChatWindow: () => <div>ChatWindow</div>,
}));

vi.mock("@/components/design/home/MessageInput", () => ({
  MessageInput: () => <div>MessageInput</div>,
}));

describe("HomePage", () => {
  it("renders Sidebar, ChatWindow, and MessageInput", () => {
    render(<HomePage />);

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("ChatWindow")).toBeInTheDocument();
    expect(screen.getByText("MessageInput")).toBeInTheDocument();
  });
});
