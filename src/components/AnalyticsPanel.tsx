import React from 'react';

interface AnalyticsPanelProps {
  energySavings: number;
  co2Savings: number;
  moneySavings: number;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ energySavings, co2Savings, moneySavings }) => {
  return (
    <div className="w-full lg:w-72 bg-white rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-lg flex flex-row lg:flex-col justify-center lg:justify-start items-center flex-wrap lg:flex-nowrap gap-6 lg:gap-0 lg:space-y-10">
      {/* Energy Savings */}
      <div className="bg-cyan-400 w-[130px] h-[130px] min-w-[130px] min-h-[130px] sm:w-[170px] sm:h-[170px] sm:min-w-[170px] sm:min-h-[170px] rounded-full border-4 border-white shadow-lg flex-shrink-0 flex flex-col items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <img src="/icons/energy.svg" alt="energy" className="w-8 h-8 sm:w-12 sm:h-12" />
        <h1 className="text-xl sm:text-3xl md:text-4xl tracking-tight font-bold">
          {energySavings > 0 ? `${energySavings.toLocaleString()}` : "xxxx"}
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm font-medium">Energy Savings</p>
        {energySavings > 0 && <span className="text-[8px] sm:text-[10px] opacity-80">kWh</span>}
      </div>

      {/* CO2 Savings */}
      <div className="bg-pink-400 w-[130px] h-[130px] min-w-[130px] min-h-[130px] sm:w-[170px] sm:h-[170px] sm:min-w-[170px] sm:min-h-[170px] rounded-full border-4 border-white shadow-lg flex-shrink-0 flex flex-col items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <img src="/icons/carbon.svg" alt="carbon" className="w-8 h-8 sm:w-13 sm:h-13" />
        <h1 className="text-xl sm:text-3xl md:text-4xl tracking-tight font-bold">
          {co2Savings > 0 ? `${co2Savings.toLocaleString()}` : "xxxx"}
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm font-medium">CO₂ Savings</p>
        {co2Savings > 0 && <span className="text-[8px] sm:text-[10px] opacity-80">kg</span>}
      </div>

      {/* Money Savings */}
      <div className="bg-green-500 w-[130px] h-[130px] min-w-[130px] min-h-[130px] sm:w-[170px] sm:h-[170px] sm:min-w-[170px] sm:min-h-[170px] rounded-full border-4 border-white shadow-lg flex-shrink-0 flex flex-col items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <img src="/icons/money.svg" alt="money" className="w-8 h-8 sm:w-13 sm:h-13" />
        <h1 className="text-xl sm:text-3xl md:text-4xl tracking-tight font-bold">
          {moneySavings > 0 ? `₹${moneySavings.toLocaleString()}` : "xxxx"}
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm font-medium">Money Savings</p>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
