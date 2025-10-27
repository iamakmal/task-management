import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from "../TextArea";

describe("TextArea component", () => {
  it("renders with the given placeholder", () => {
    render(<TextArea placeholder="Enter description" />);
    const textarea = screen.getByPlaceholderText("Enter description");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with the correct value", () => {
    render(<TextArea value="Some text" />);
    const textarea = screen.getByDisplayValue("Some text");
    expect(textarea).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with the correct number of rows", () => {
    render(<TextArea rows={6} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "6");
  });
});
