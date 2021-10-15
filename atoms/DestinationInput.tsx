import React, { useState } from "react";
import { Airport, useAirports } from "../api/useAirports";
import { useDebounceValue } from "../hooks/useDebouncedValue";

interface DestinationInputProps {
  id: string;
  label: string;
  placeholder: string;
}

export const DestinationInput = ({
  label,
  id,
  placeholder,
}: DestinationInputProps) => {
  const [text, setText] = useState<string>("");
  const [airport, setAirport] = useState<Airport | null>(null);
  const debouncedQuery = useDebounceValue(text, 300);
  const airports = useAirports(debouncedQuery);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
    setAirport(null);
  };

  const handleChooseAirport = (data: Airport) => {
    setText(`${data.iata} ${data.name}`);
    setAirport(data);
  };

  return (
    <div className="relative flex-1">
      <input
        id={id}
        name={id}
        type="text"
        value={text}
        onChange={handleChange}
        className="peer h-12 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 focus:border-2 p-3"
        placeholder={placeholder}
      />
      {text.length > 0 ? (
        <label
          htmlFor={id}
          className="absolute left-2 px-1 -top-2.5 bg-white text-indigo-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm"
        >
          {label}
        </label>
      ) : null}

      {airports.length && !airport ? (
        <div className="absolute mt-2 w-full rounded shadow-md z-20 bg-white rounded-lg border-2 border-indigo-600 border-opacity-25">
          <ul className="divide-y divide-gray-200">
            {airports.map((airport) => (
              <li
                key={airport.iata}
                onClick={() => handleChooseAirport(airport)}
              >
                <p className="p-2 block text-black hover:bg-indigo-200 cursor-pointer">
                  {airport.iata} {airport.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
