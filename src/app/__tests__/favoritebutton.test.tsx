import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "@/components/favoritebutton";

const product = { id: 1, title: "test", price: 100, description: "", category: "", image: "", rating: { rate: 0, count: 0 } };

describe("FavoriteButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("お気に入り追加ボタンが表示される", () => {
    render(<FavoriteButton product={product} />);
    expect(screen.getByRole("button", { name: "お気に入り追加" })).toBeInTheDocument();
    expect(screen.getByText("🤍")).toBeInTheDocument();
  });

  it("クリックでお気に入り状態になる", () => {
    render(<FavoriteButton product={product} />);
    const button = screen.getByRole("button", { name: "お気に入り追加" });
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "お気に入り解除" })).toBeInTheDocument();
    expect(screen.getByText("❤️")).toBeInTheDocument();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites.some((item: typeof product) => item.id === product.id)).toBe(true);
  });

  it("お気に入り解除ボタンで解除できる", () => {
    localStorage.setItem("favorites", JSON.stringify([product]));
    render(<FavoriteButton product={product} />);
    const button = screen.getByRole("button", { name: "お気に入り解除" });
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "お気に入り追加" })).toBeInTheDocument();
    expect(screen.getByText("🤍")).toBeInTheDocument();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites.some((item: typeof product) => item.id === product.id)).toBe(false);
  });
});