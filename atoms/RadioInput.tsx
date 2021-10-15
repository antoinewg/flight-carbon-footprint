import React from "react";

interface RadioInputProps {
  id: string;
  label: string;
  name: string;
}

const NON_BREAKING_SPACE = "\xa0";

export const RadioInput = ({ id, label, name }: RadioInputProps) => (
  <label className="inline-flex items-center">
    <input type="radio" name={name} value={id} />
    <span className="ml-2">{label.split(" ").join(NON_BREAKING_SPACE)}</span>
  </label>
);
