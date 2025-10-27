import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
  it("renders with the given label", () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    render(<Button label="Styled" customStyle="bg-red-500" />);
    const button = screen.getByRole("button", { name: "Styled" });
    expect(button.className).toMatch(/bg-red-500/);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button.className).toMatch(/opacity-50/);
    expect(button.className).toMatch(/pointer-events-none/);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled" disabled onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
