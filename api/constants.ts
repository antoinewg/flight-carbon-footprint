// Maximum recommended carbon emission is 2T of CO2
//
// Reference: https://www.nature.org/en-us/get-involved/how-to-help/carbon-footprint-calculator/
export const RECOMMENDED_MAXIMUM_CARBON_FOOTPRINT = 2000; // in kilograms

// We assume that for each hour of flight, a single passenger is responsible
// of 250kg of carbon dioxyde emission.
//
// Reference: https://www.carbonindependent.org/22.html
export const CO2_CONSUMPTION_PER_PAX_PER_HOUR_OF_FLIGHT = 250; // in kilograms

// Average speed of an aircraft (compensating for taxi, landing and take-off).
// A long courrier has a higher cruise speed. But we also compensate by not
// taking into account the 'Radiative forcing' of high altitude flights.
//
// Reference: https://www.carbonindependent.org/22.html
export const AVERAGE_AIRCRAFT_SPEED = 600;
