import React from 'react';
import AccordionItem from './AccordionItem';
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
  };
  setOpenStates: React.Dispatch<React.SetStateAction<{
    orientationOpen: boolean;
    wallOpen: boolean;
    roofOpen: boolean;
    glassOpen: boolean;
    shadingOpen: boolean;
    lightingOpen: boolean;
    airConditioningOpen: boolean;
  }>>;
  handleSelect: (key: keyof Selections, value: string) => void;
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
  } = options;

  const {
    selectedOrientation,
    selectedWall,
    selectedRoof,
    selectedGlass,
    selectedShading,
    selectedLighting,
    selectedAirConditioning,
  } = selections;

  const {
    orientationOpen,
    wallOpen,
    roofOpen,
    glassOpen,
    shadingOpen,
    lightingOpen,
    airConditioningOpen,
  } = openStates;

  const toggleOpen = (key: keyof typeof openStates) => {
    setOpenStates({
      ...openStates,
      [key]: !openStates[key]
    });
  };

  const onSelect = (key: keyof Selections, value: string) => {
    handleSelect(key, value);
    const openStateKey = (key.replace('selected', '').charAt(0).toLowerCase() + key.replace('selected', '').slice(1) + 'Open') as keyof typeof openStates;
    setOpenStates({
      ...openStates,
      [openStateKey]: false
    });
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
        title="Roof"
        icon="/icons/roof.svg"
        isOpen={roofOpen}
        onToggle={() => toggleOpen('roofOpen')}
        options={roofOptions}
        selectedValue={selectedRoof}
        onSelect={(val) => onSelect('selectedRoof', val)}
        groupName="roof"
        iconSize="w-7 h-7"
      />

      <AccordionItem
        title="Glass"
        icon="/icons/glass5.svg"
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
