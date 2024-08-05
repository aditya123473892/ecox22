import React from "react";

const CarbonFootprintCalculator = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Carbon Footprint Calculator
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Transportation
        </h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Car Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Car Emissions = (Total Kilometers Driven / Fuel Efficiency (km/l)) ×
            Emission Factor (kg CO₂ per liter)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Public Transport Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Public Transport Emissions = Distance Traveled (km) × Emission
            Factor (kg CO₂ per km)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Air Travel Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Air Travel Emissions = Flight Distance (km) × Emission Factor (kg
            CO₂ per km)
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Home Energy Use
        </h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Electricity Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Electricity Emissions = Annual kWh × Emission Factor (kg CO₂ per
            kWh)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Heating Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Heating Emissions = Annual Consumption (kg) × Emission Factor (kg
            CO₂ per kg of LPG)
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Food Consumption
        </h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Dietary Emissions:</strong>
          </p>
          <p className="text-gray-700">
            Vegetarian Diet: 1.5 t CO₂e, Non-Vegetarian Diet: 2.0 t CO₂e
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Goods and Services
        </h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Consumer Goods and Services Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Goods and Services Emissions = Annual Expenditure (INR) × Emission
            Factor (kg CO₂ per INR)
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Waste</h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full transition transform hover:scale-105 hover:bg-gray-200">
          <p className="text-gray-700">
            <strong>Waste Emissions (kg CO₂):</strong>
          </p>
          <p className="text-gray-700">
            Waste Emissions = (Total Waste (kg) - Recycled Waste (kg)) ×
            Emission Factor (kg CO₂ per kg of waste)
          </p>
        </div>
      </div>
      <div className="bg-green-600 text-white p-6 rounded-lg text-center transition transform hover:scale-105 hover:bg-green-700">
        <h2 className="text-xl font-semibold mb-2">
          Total Annual Carbon Footprint
        </h2>
        <div>
          <p>
            <strong>Total Carbon Footprint (kg CO₂):</strong>
          </p>
          <p>
            Total Carbon Footprint (kg CO₂) = Transportation Emissions + Home
            Energy Emissions + Food Consumption Emissions + Goods and Services
            Emissions + Waste Emissions
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
