import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Footer from "@/components/footer";

describe("Footer", () => {
  it("コピーライトが表示される", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 ショッピングサイト. All rights reserved./)).toBeInTheDocument();
  });
});