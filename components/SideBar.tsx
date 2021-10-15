import React from "react";
import { RadioInput } from "../atoms/RadioInput";
import { SelectInput } from "../atoms/SelectInput";
import { DestinationInput } from "../atoms/DestinationInput";

export const SideBar = () => {
  return (
    <div className="absolute m-6 p-6 z-10 bg-white w-1/3 rounded-lg border-2 border-indigo-600 border-opacity-50">
      {/* Roundtrip / One-way / Multi-city */}
      <div className="flex gap-6 mt-2 mb-10 flex-col md:flex-row center">
        <RadioInput name="triptype" id="roundtrip" label="Roundtrip" />
        <RadioInput name="triptype" id="oneway" label="One way" />
        <RadioInput name="triptype" id="multicity" label="Multi city" />
      </div>

      {/* From* / To* */}
      <div className="flex gap-6 mb-4 flex-col md:flex-row center">
        <DestinationInput id="departure" placeholder="From..." label="From" />
        <DestinationInput id="arrival" placeholder="To..." label="To" />
      </div>

      {/* From* / To* if multi-city */}
      {/* Add another flight if multi-city */}
      <div className="flex gap-6 mb-10 flex-col md:flex-row center">
        <DestinationInput id="departure" placeholder="From..." label="From" />
        <DestinationInput id="arrival" placeholder="To..." label="To" />
      </div>

      {/* Economy/Business/First class */}

      <div className="mb-10 w-4/6">
        <SelectInput
          id="businessclass"
          label="Class"
          options={["Economy", "Business", "First class"]}
        />
      </div>

      <div className="flex mb-2 mt-10 justify-center mt-6">
        <button className="bg-indigo-600 text-white font-extrabold text-lg rounded-full px-6 py-3">
          Calculate
        </button>
      </div>
    </div>
  );
};
