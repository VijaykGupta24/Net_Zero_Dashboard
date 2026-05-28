import React from 'react';
import AccordionItem from './AccordionItem';
import SliderControl from './SliderControl';
import { Selections } from '../utils/calculations';

interface Option {
  name: string;
  icon: string;
}

interface SidebarProps {
  options: {
    orientationOptions: Option[];
    wallOptions: Option[];
    roofOptions: Option[];
    glassOptions: Option[];
    shadingOptions: Option[];
    lightingOptions: Option[];
    airConditioningOptions: Option[];
    partitionWallOptions: Option[];
  };
  selections: Selections;
  openStates: {
    orientationOpen: boolean;
    wallOpen: boolean;
    roofOpen: boolean;
    glassOpen: boolean;
    shadingOpen: boolean;
    lightingOpen: boolean;
    airConditioningOpen: boolean;
    partitionWallOpen: boolean;
  };
  setOpenStates: React.Dispatch<React.SetStateAction<{
    orientationOpen: boolean;
    wallOpen: boolean;
    roofOpen: boolean;
    glassOpen: boolean;
    shadingOpen: boolean;
    lightingOpen: boolean;
    airConditioningOpen: boolean;
    partitionWallOpen: boolean;
  }>>;
  handleSelect: (key: keyof Selections, value: string | number) => void;
  handleBestCombination: () => void;
  handleResetBaseline: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  options,
  selections,
  openStates,
  setOpenStates,
  handleSelect,
  handleBestCombination,
  handleResetBaseline,
}) => {
  const {
    orientationOptions,
    wallOptions,
    roofOptions,
    glassOptions,
    shadingOptions,
    lightingOptions,
    airConditioningOptions,
    partitionWallOptions,
  } = options;

  const {
    selectedOrientation,
    selectedWall,
    selectedRoof,
    selectedGlass,
    selectedShading,
    selectedLighting,
    selectedAirConditioning,
    selectedPartitionWall,
    wwr,
    externalWindowOpening,
    setpointTemperature,
  } = selections;

  const {
    orientationOpen,
    wallOpen,
    roofOpen,
    glassOpen,
    shadingOpen,
    lightingOpen,
    airConditioningOpen,
    partitionWallOpen,
  } = openStates;

  // Exclusive accordion: opening one closes all others
  const toggleOpen = (key: keyof typeof openStates) => {
    const allClosed = Object.keys(openStates).reduce((acc, k) => {
      acc[k as keyof typeof openStates] = false;
      return acc;
    }, {} as typeof openStates);

    setOpenStates({
      ...allClosed,
      [key]: !openStates[key],
    });
  };

  // Selection updates state directly without closing the accordion
  const onSelect = (key: keyof Selections, value: string | number) => {
    handleSelect(key, value);
  };

  return (
    <div className="space-y-4 flex-1">
      <AccordionItem
        title="Orientation"
        icon="/icons/navigate.svg"
        isOpen={orientationOpen}
        onToggle={() => toggleOpen('orientationOpen')}
        options={orientationOptions}
        selectedValue={selectedOrientation}
        onSelect={(val) => onSelect('selectedOrientation', val)}
        groupName="orientation"
      />

      <AccordionItem
        title="Wall"
        icon="/icons/wall.svg"
        isOpen={wallOpen}
        onToggle={() => toggleOpen('wallOpen')}
        options={wallOptions}
        selectedValue={selectedWall}
        onSelect={(val) => onSelect('selectedWall', val)}
        groupName="wall"
      />

      <AccordionItem
        title="Partition Wall"
        icon="/icons/partition wall.svg"
        isOpen={partitionWallOpen}
        onToggle={() => toggleOpen('partitionWallOpen')}
        options={partitionWallOptions}
        selectedValue={selectedPartitionWall}
        onSelect={(val) => onSelect('selectedPartitionWall', val)}
        groupName="partitionWall"
      />

      <AccordionItem
        title="Roof"
        icon="/icons/roof.svg"
        isOpen={roofOpen}
        onToggle={() => toggleOpen('roofOpen')}
        options={roofOptions}
        selectedValue={selectedRoof}
        onSelect={(val) => onSelect('selectedRoof', val)}
        groupName="roof"
        iconSize="w-8 h-8"
      />

      <AccordionItem
        title="Glass"
        icon="/icons/glass.svg"
        isOpen={glassOpen}
        onToggle={() => toggleOpen('glassOpen')}
        options={glassOptions}
        selectedValue={selectedGlass}
        onSelect={(val) => onSelect('selectedGlass', val)}
        groupName="glass"
        iconSize="w-10 h-10"
      />

      <AccordionItem
        title="Shading"
        icon="/icons/shading.svg"
        isOpen={shadingOpen}
        onToggle={() => toggleOpen('shadingOpen')}
        options={shadingOptions}
        selectedValue={selectedShading}
        onSelect={(val) => onSelect('selectedShading', val)}
        groupName="shading"
        iconSize="w-7 h-7"
      />

      <AccordionItem
        title="Lighting"
        icon="/icons/light.svg"
        isOpen={lightingOpen}
        onToggle={() => toggleOpen('lightingOpen')}
        options={lightingOptions}
        selectedValue={selectedLighting}
        onSelect={(val) => onSelect('selectedLighting', val)}
        groupName="lighting"
        iconSize="w-7 h-7"
      />

      <AccordionItem
        title="AC"
        icon="/icons/AC.svg"
        isOpen={airConditioningOpen}
        onToggle={() => toggleOpen('airConditioningOpen')}
        options={airConditioningOptions}
        selectedValue={selectedAirConditioning}
        onSelect={(val) => onSelect('selectedAirConditioning', val)}
        groupName="airConditioning"
        iconSize="w-7 h-7"
        extraContent={
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-black font-semibold text-sm">Setpoint Temperature</span>
              <span className="text-lg font-bold text-cyan-600">{setpointTemperature}°C</span>
            </div>
            <input
              type="range"
              min={20}
              max={30}
              value={setpointTemperature}
              onChange={(e) => onSelect('setpointTemperature', Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer slider-cyan bg-gray-200"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((setpointTemperature - 20) / 10) * 100}%, #e5e7eb ${((setpointTemperature - 20) / 10) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 font-medium">
              <span>20°C</span>
              <span>30°C</span>
            </div>
          </div>
        }
      />

      <SliderControl
        label="Window to Wall Ratio"
        icon="/icons/wwr.svg"
        value={wwr}
        min={0}
        max={100}
        unit="%"
        onChange={(val) => onSelect('wwr', val)}
        iconSize="w-9 h-9"
      />

      <SliderControl
        label="External Window Opening"
        icon="/icons/ewr.svg"
        value={externalWindowOpening}
        min={0}
        max={100}
        unit="%"
        onChange={(val) => onSelect('externalWindowOpening', val)}
      />

      <div className="mt-auto space-y-4 pt-8 pb-4">
        <button
          onClick={handleBestCombination}
          className="w-full bg-green-500 text-white p-4 rounded-xl font-semibold hover:bg-green-600 transition ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        >
          Best Combination
        </button>
        <button
          onClick={handleResetBaseline}
          className="w-full bg-red-500 text-white p-4 rounded-xl font-semibold hover:bg-red-600 transition ease-in-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        >
          Reset Baseline
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
