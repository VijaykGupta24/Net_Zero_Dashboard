import React from 'react';

interface SliderControlProps {
  label: string;
  icon: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
  iconSize?: string;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  icon,
  value,
  min,
  max,
  unit,
  onChange,
  iconSize = "w-7 h-7",
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img src={icon} alt={label} className={iconSize} />
        <h2 className="text-lg font-bold text-black">{label}</h2>
      </div>

      {/* Value Display */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-cyan-600 tracking-tight">
          {value}{unit}
        </span>
      </div>

      {/* Slider Track */}
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider-cyan"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        {/* Min/Max Labels */}
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default SliderControl;
