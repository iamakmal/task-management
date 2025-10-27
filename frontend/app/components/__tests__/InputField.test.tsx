import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../InputField";

describe("InputField component", () => {
  it("renders with the given name as placeholder", () => {
    render(<InputField name="Task Name" />);
    const input = screen.getByPlaceholderText("Task Name");
    expect(input).toBeInTheDocument();
  });

  it("renders with the correct value", () => {
    const handleChange = jest.fn();
    render(<InputField name="Task" value="My Task" onChange={handleChange} />);
    const input = screen.getByDisplayValue("My Task");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn();
    render(<InputField name="Task" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Task");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("sets required attribute when required is true", () => {
    render(<InputField name="Task" required />);
    const input = screen.getByPlaceholderText("Task");
    expect(input).toBeRequired();
  });
});
