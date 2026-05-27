import React from 'react';

interface Option {
  name: string;
  icon: string;
}

interface AccordionItemProps {
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  groupName: string;
  iconSize?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  icon, 
  isOpen, 
  onToggle, 
  options, 
  selectedValue, 
  onSelect, 
  groupName,
  iconSize = "w-8 h-8"
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
      >
        <img src={icon} alt={title} className={iconSize} />
        <h2 className="text-lg font-bold text-black">{title}</h2>
        <span className={`text-xl text-gray-900 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
          ▶
        </span>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
          <div className="space-y-4">
            {options.map((option) => (
              <label
                key={option.name}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                  selectedValue === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name={groupName}
                  checked={selectedValue === option.name}
                  onChange={() => {
                    onSelect(option.name);
                  }}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <div className="flex items-center gap-3">
                  <img src={option.icon} alt={option.name} className="w-9 h-9 object-contain" />
                  <span className="text-black font-medium">{option.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
