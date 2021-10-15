import React from "react";

interface DestinationInputProps {
  id: string;
  label: string;
  placeholder: string;
}

export const DestinationInput = ({
  label,
  id,
  placeholder,
}: DestinationInputProps) => (
  <div className="relative flex-1">
    <input
      id={id}
      name={id}
      type="text"
      className="peer h-12 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:border-2 p-3"
      placeholder={placeholder}
    />
    <label
      htmlFor={id}
      className="absolute left-2 px-1 -top-2.5 bg-white text-indigo-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm"
    >
      {label}
    </label>
  </div>
);
