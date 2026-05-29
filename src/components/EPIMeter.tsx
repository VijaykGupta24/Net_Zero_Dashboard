import React from 'react';

interface EPIMeterProps {
  currentEpi: number;
}

const EPIMeter: React.FC<EPIMeterProps> = ({ currentEpi }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 px-4 sm:px-10 py-6 shadow-lg mb-6 mx-4 sm:mx-6 flex-shrink-0">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
          Energy Performance Index (EPI)
        </h2>
        <div className="bg-cyan-500 text-white px-5 py-2 rounded-full shadow-md font-semibold self-start sm:self-auto text-sm sm:text-base">
          {currentEpi} kWh/m²/year
        </div>
      </div>

      {/* EPI Meter */}
      <div className="relative pt-6 pb-2">
        {/* Gradient Bar */}
        <div className="h-6 sm:h-8 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 shadow-md"></div>

        {/* Indicator */}
        <div
          className="absolute top-[-4px] flex flex-col items-center transition-all duration-500"
          style={{
            left: `${Math.min(Math.max(((currentEpi) / 200) * 100, 0), 100)}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Pointer */}
          <div className="w-4 h-10 sm:w-5 sm:h-14 bg-cyan-500 rounded-full shadow-lg border-2 border-white transition-all duration-300 hover:scale-110"></div>
          {/* Label */}
          <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap">
            Current EPI
          </p>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between mt-3 text-xs sm:text-sm text-gray-600 font-medium px-1">
        <span>0</span>
        <span>50</span>
        <span>100</span>
        <span>150</span>
        <span>200</span>
      </div>
    </div>
  );
};

export default EPIMeter;
