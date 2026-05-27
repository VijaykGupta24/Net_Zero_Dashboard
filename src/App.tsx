import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";
import EPIMeter from "./components/EPIMeter";
import { calculateSavings, Selections } from "./utils/calculations";

export default function App() {
  // Option selected states
  const [selections, setSelections] = useState<Selections>({
    selectedOrientation: "",
    selectedWall: "",
    selectedRoof: "",
    selectedGlass: "",
    selectedShading: "",
    selectedLighting: "",
    selectedAirConditioning: "",
  });

  // Menu open states
  const [openStates, setOpenStates] = useState({
    orientationOpen: false,
    wallOpen: false,
    roofOpen: false,
    glassOpen: false,
    shadingOpen: false,
    lightingOpen: false,
    airConditioningOpen: false,
  });

  // Mobile menu/sidebar open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const options = {
    shadingOptions: [
      { name: "No Shading", icon: "/icons/no shading.svg" },
      { name: "3 Ft Shading", icon: "/icons/3ft shading.svg" },
      { name: "5 Ft Shading", icon: "/icons/5ft shading.svg" },
    ],
    airConditioningOptions: [
      { name: "3 Star AC", icon: "/icons/threestar.svg" },
      { name: "5 Star AC", icon: "/icons/fivestar.svg" },
    ],
    lightingOptions: [
      { name: "LED", icon: "/icons/led.svg" },
      { name: "CFL", icon: "/icons/cfl.svg" },
    ],
    glassOptions: [
      { name: "Glass(5mm)", icon: "/icons/glass5.svg" },
      { name: "Toughened Glass", icon: "/icons/toughened.svg" },
      { name: "Double Glazing(12mm)", icon: "/icons/double glazing.svg" },
    ],
    roofOptions: [
      { name: "RRC", icon: "/icons/rrc.svg" },
      { name: "RRC + Tiles + Chips", icon: "/icons/rrc tiles chips.svg" },
      { name: "RRC + Insulation", icon: "/icons/rrc insulation.svg" },
    ],
    wallOptions: [
      { name: "Red Brick", icon: "/icons/red brick.svg" },
      { name: "Fly Ash Brick", icon: "/icons/fly ash brick.svg" },
      { name: "AAC", icon: "/icons/aac.svg" },
    ],
    orientationOptions: [
      { name: "North", icon: "/icons/north.svg" },
      { name: "South", icon: "/icons/south.svg" },
      { name: "East", icon: "/icons/east.svg" },
      { name: "West", icon: "/icons/west.svg" },
    ],
  };

  const { energySavings, co2Savings, moneySavings, currentEpi } = calculateSavings(selections);

  const handleSelect = (key: keyof Selections, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const handleBestCombination = () => {
    setSelections({
      selectedOrientation: "North",
      selectedWall: "AAC",
      selectedRoof: "RRC + Insulation",
      selectedGlass: "Double Glazing(12mm)",
      selectedShading: "5 Ft Shading",
      selectedLighting: "LED",
      selectedAirConditioning: "5 Star AC",
    });

    setOpenStates({
      orientationOpen: false,
      wallOpen: false,
      roofOpen: false,
      glassOpen: false,
      shadingOpen: false,
      lightingOpen: false,
      airConditioningOpen: false,
    });
  };

  const handleResetBaseline = () => {
    setSelections({
      selectedOrientation: "",
      selectedWall: "",
      selectedRoof: "",
      selectedGlass: "",
      selectedShading: "",
      selectedLighting: "",
      selectedAirConditioning: "",
    });

    setOpenStates({
      orientationOpen: false,
      wallOpen: false,
      roofOpen: false,
      glassOpen: false,
      shadingOpen: false,
      lightingOpen: false,
      airConditioningOpen: false,
    });
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[#eef2f5]">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-80 bg-white border-r border-gray-200 p-6 flex-col shadow-sm h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-4xl tracking-tight font-bold mb-10 text-gray-800">
          Select EE Measures
        </h2>
        <Sidebar 
          options={options}
          selections={selections}
          openStates={openStates}
          setOpenStates={setOpenStates}
          handleSelect={handleSelect}
          handleBestCombination={handleBestCombination}
          handleResetBaseline={handleResetBaseline}
        />
      </div>

      {/* Sidebar - Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm z-50 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Select EE Measures</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-black p-2 text-xl font-bold">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">
          <Sidebar 
            options={options}
            selections={selections}
            openStates={openStates}
            setOpenStates={setOpenStates}
            handleSelect={handleSelect}
            handleBestCombination={handleBestCombination}
            handleResetBaseline={handleResetBaseline}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-1"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src="/icons/eco niwas.svg" alt="eco niwas" className="w-10 h-10 sm:w-13 sm:h-13 object-contain" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight font-bold text-cyan-600 whitespace-nowrap">
              NZEB Building Analyzer
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="font-medium text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg text-right ml-2">
            Rajasthan → Jaipur → Composite
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 p-4 sm:p-6 min-w-0">
          {/* Building Area */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="w-full max-w-[700px] aspect-[700/450] bg-white rounded-[25px] sm:rounded-[35px] shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="h-14 sm:h-18 border-b border-gray-200 flex items-center px-4 sm:px-6 bg-gray-50 flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                  Building Visualization
                </h2>
              </div>

              {/* Visualization Area */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-bold text-gray-400 text-center">
                  3D Building Area
                </h1>
              </div>
            </div>
          </div>

          <AnalyticsPanel 
            energySavings={energySavings}
            co2Savings={co2Savings}
          />
        </div>

        {/* Bottom EPI Section */}
        <EPIMeter currentEpi={currentEpi} />
      </div>
    </main>
  );
}
