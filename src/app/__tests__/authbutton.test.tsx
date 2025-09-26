import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import AuthButton from "@/components/authbutton";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("AuthButton", () => {
  it("GitHubでログインボタンが表示される", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<AuthButton />);
    expect(screen.getByText("GitHubでログイン")).toBeInTheDocument();
  });

  it("ログアウトボタンが表示される", () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { name: "test" } } });
    render(<AuthButton />);
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
  });

  it("ログインボタンをクリックするとdisabledになる", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<AuthButton />);
    const button = screen.getByText("GitHubでログイン");
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});