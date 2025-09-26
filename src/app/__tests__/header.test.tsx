import '@testing-library/jest-dom';
import React from "react";
import Header from "@/components/header";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("Header", () => {
  it("ホームへのリンクが表示される", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<Header />);
    expect(screen.getByText("ホーム")).toBeInTheDocument();
  });

  it("ログインリンクが表示される（未ログイン時）", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<Header />);
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  it("プロフィールリンクが表示される（ログイン時）", () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { name: "test" } } });
    render(<Header />);
    expect(screen.getByText("プロフィール")).toBeInTheDocument();
  });

  it("エラー発生ボタンを押すとエラーがthrowされる", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<Header />);
    expect(() => {
      fireEvent.click(screen.getByText("エラーを発生させる"));
    }).toThrow("テスト用のエラーです");
  });
});