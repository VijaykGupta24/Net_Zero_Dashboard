import React from 'react';

interface EPIMeterProps {
  currentEpi: number;
  savingsPercentage: number;
  baselineValue?: number;
}

const EPIMeter: React.FC<EPIMeterProps> = ({ 
  currentEpi, 
  savingsPercentage, 
  baselineValue = 150 
}) => {
  const currentEpiPercent = Math.min(Math.max((currentEpi / 200) * 100, 0), 100);
  const baselinePercent = Math.min(Math.max((baselineValue / 200) * 100, 0), 100);
  const ticks = [0, 25, 50, 75, 100, 125, 150, 175, 200];

  return (
    <div className="bg-white rounded-none border border-gray-200 p-6 sm:p-8 shadow-md mb-6 mx-4 sm:mx-6 flex-shrink-0">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">
          Energy Performance Index (EPI)
        </h2>
        <div className="bg-cyan-50/90 text-cyan-700 px-4 py-1.5 border border-cyan-200 font-bold shadow-sm rounded-none text-xs sm:text-sm tracking-wider select-none hover:bg-cyan-100 transition-colors">
          {currentEpi} kWh/m²/year
        </div>
      </div>

      {/* EPI Meter */}
      <div className="relative pt-16 pb-12 my-2">
        {/* Gradient Bar - Sleek h-11 to h-12 to fit numbers and track inside */}
        <div className="relative w-full h-11 sm:h-12 bg-gradient-to-r from-[#22c55e] via-[#eab308] via-[#f97316] to-[#ef4444] flex items-center px-4 shadow-sm border border-gray-200/50">
          
          {/* EPI Label */}
          <span className="text-gray-900 font-extrabold text-xs sm:text-sm tracking-widest uppercase select-none w-10 sm:w-12 text-center mr-4">
            EPI
          </span>

          {/* Track Container */}
          <div className="relative flex-1 h-[6px] bg-white/60 backdrop-blur-[1px] border border-white/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
            
            {/* Cyan fill */}
            <div
              className="absolute left-0 top-0 h-full bg-[#4cc9c4] transition-all duration-500"
              style={{ width: `${currentEpiPercent}%` }}
            />

            {/* Tick Marks - extending upwards */}
            {ticks.map((tick) => {
              const tickPercent = (tick / 200) * 100;
              return (
                <div
                  key={tick}
                  className="absolute bottom-full w-[1.5px] h-[5px] bg-gray-900/80"
                  style={{ left: `${tickPercent}%` }}
                />
              );
            })}

            {/* Scale Labels - placed INSIDE the gradient bar, directly below the white track */}
            {ticks.map((tick) => {
              const tickPercent = (tick / 200) * 100;
              return (
                <span
                  key={tick}
                  className="absolute top-full mt-1 text-[9px] sm:text-[11px] font-extrabold text-gray-900 -translate-x-1/2 select-none"
                  style={{ left: `${tickPercent}%` }}
                >
                  {tick}
                </span>
              );
            })}

            {/* Movable Indicator (Cyan Circular Node, vertical line, triangle, text) */}
            <div
              className="absolute top-[-1px] -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-500"
              style={{ left: `${currentEpiPercent}%`, transform: 'translateX(-50%)' }}
            >
              {/* Savings Label above indicator */}
              <div className="absolute bottom-[30px] flex flex-col items-center select-none">
                <span className="text-[10px] sm:text-xs font-bold text-cyan-700 bg-cyan-50/95 px-2.5 py-0.5 border border-cyan-200 shadow-sm rounded-none whitespace-nowrap mb-1">
                  My Energy Savings ({Math.round(savingsPercentage)}%)
                </span>
                {/* Triangle pointing down */}
                <div className="absolute bottom-[-15px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-500" />
              </div>

              {/* Vertical connector line */}
              <div className="absolute bottom-0 w-[1.5px] h-4 bg-cyan-500" />

              {/* Circular Node with white center and cyan border */}
              <div className="absolute top-[-5px] w-[16px] h-[16px] rounded-full bg-white border-[3.5px] border-[#4cc9c4] shadow-[0_0_8px_rgba(76,201,196,0.6)] cursor-pointer transform hover:scale-120 transition-all duration-300" />
            </div>

            {/* Baseline Marker */}
            <div
              className="absolute top-[-26px] -translate-y-1/2 z-30 transition-all duration-500"
              style={{ left: `${baselinePercent}%`, transform: 'translateX(-50%)', height: '56px' }}
            >
              {/* Top Triangle */}
              <div className="absolute bottom-full mb-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-red-500" />

              {/* Vertical Line */}
              <div className="w-[3px] h-full bg-red-500 mx-auto shadow-[0_0_4px_rgba(239,68,68,0.3)]" />

              {/* Bottom Triangle */}
              <div className="absolute top-full mt-[1px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-500" />

              {/* Baseline Label */}
              <span className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold tracking-wider text-red-600 uppercase whitespace-nowrap bg-red-50 px-2 py-0.5 border border-red-200 rounded-none shadow-sm select-none">
                Baseline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPIMeter;
