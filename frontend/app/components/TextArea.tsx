import React from "react";

interface Props {
  rows?: number;
  placeholder?: string;
}
const TextArea = ({ rows = 4, placeholder }: Props) => {
  return (
    <div>
      <textarea
        id="message"
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
