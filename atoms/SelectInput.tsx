import React from "react";

interface SelectInputProps {
  id: string;
  label: string;
  options: string[];
}

export const SelectInput = ({ id, label, options }: SelectInputProps) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="absolute left-2 px-1 -top-2.5 bg-white text-indigo-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm"
    >
      {label}
    </label>
    <select
      id={id}
      className="peer w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:border-2 p-3 h-12"
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
