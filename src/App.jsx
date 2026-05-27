import { useState } from "react";

export default function App() {
  // Option selected states
  const [selectedOrientation, setSelectedOrientation] = useState("");
  const [selectedWall, setSelectedWall] = useState("");
  const [selectedRoof, setSelectedRoof] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedShading, setSelectedShading] = useState("");
  const [selectedLighting, setSelectedLighting] = useState("");
  const [selectedAirConditioning, setSelectedAirConditioning] = useState("");

  // Menu open states
  const [orientationOpen, setOrientationOpen] = useState(false);
  const [wallOpen, setWallOpen] = useState(false);
  const [roofOpen, setRoofOpen] = useState(false);
  const [glassOpen, setGlassOpen] = useState(false);
  const [shadingOpen, setShadingOpen] = useState(false);
  const [lightingOpen, setLightingOpen] = useState(false);
  const [airConditioningOpen, setAirConditioningOpen] = useState(false);

  // Mobile menu/sidebar open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shadingOptions = [
    { name: "No Shading", icon: "/icons/no shading.svg" },
    { name: "3 Ft Shading", icon: "/icons/3ft shading.svg" },
    { name: "5 Ft Shading", icon: "/icons/5ft shading.svg" },
  ];

  const airConditioningOptions = [
    { name: "3 Star AC", icon: "/icons/threestar.svg" },
    { name: "5 Star AC", icon: "/icons/fivestar.svg" },
  ];

  const lightingOptions = [
    { name: "LED", icon: "/icons/led.svg" },
    { name: "CFL", icon: "/icons/cfl.svg" },
  ];

  const glassOptions = [
    { name: "Glass(5mm)", icon: "/icons/glass5.svg" },
    { name: "Toughened Glass", icon: "/icons/toughened.svg" },
    { name: "Double Glazing(12mm)", icon: "/icons/double glazing.svg" },
  ];

  const roofOptions = [
    { name: "RRC", icon: "/icons/rrc.svg" },
    { name: "RRC + Tiles + Chips", icon: "/icons/rrc tiles chips.svg" },
    { name: "RRC + Insulation", icon: "/icons/rrc insulation.svg" },
  ];

  const wallOptions = [
    { name: "Red Brick", icon: "/icons/red brick.svg" },
    { name: "Fly Ash Brick", icon: "/icons/fly ash brick.svg" },
    { name: "AAC", icon: "/icons/aac.svg" },
  ];

  const orientationOptions = [
    { name: "North", icon: "/icons/north.svg" },
    { name: "South", icon: "/icons/south.svg" },
    { name: "East", icon: "/icons/east.svg" },
    { name: "West", icon: "/icons/west.svg" },
  ];

  // Dynamic calculations
  const getSavingsPercentage = () => {
    let pct = 0;
    if (selectedOrientation === "North") pct += 2;
    if (selectedOrientation === "East") pct += 1;
    if (selectedOrientation === "South") pct += 0.5;

    if (selectedWall === "Fly Ash Brick") pct += 8;
    if (selectedWall === "AAC") pct += 15;

    if (selectedRoof === "RRC + Tiles + Chips") pct += 10;
    if (selectedRoof === "RRC + Insulation") pct += 20;

    if (selectedGlass === "Toughened Glass") pct += 5;
    if (selectedGlass === "Double Glazing(12mm)") pct += 15;

    if (selectedShading === "3 Ft Shading") pct += 6;
    if (selectedShading === "5 Ft Shading") pct += 10;

    if (selectedLighting === "LED") pct += 12;

    if (selectedAirConditioning === "5 Star AC") pct += 18;

    return pct;
  };

  const pct = getSavingsPercentage();
  const baseEpi = 180;
  const currentEpi = Math.max(50, Math.round(baseEpi * (1 - pct / 100)));

  // Baseline building annual energy consumption estimate
  const baseEnergy = 50000;
  const energySavings = pct > 0 ? Math.round(baseEnergy * (pct / 100)) : 0;
  const co2Savings = pct > 0 ? Math.round(energySavings * 0.82) : 0;
  const moneySavings = pct > 0 ? Math.round(energySavings * 8) : 0;

  const handleBestCombination = () => {
    setSelectedOrientation("North");
    setSelectedWall("AAC");
    setSelectedRoof("RRC + Insulation");
    setSelectedGlass("Double Glazing(12mm)");
    setSelectedShading("5 Ft Shading");
    setSelectedLighting("LED");
    setSelectedAirConditioning("5 Star AC");

    // Close all accordion menus
    setOrientationOpen(false);
    setWallOpen(false);
    setRoofOpen(false);
    setGlassOpen(false);
    setShadingOpen(false);
    setLightingOpen(false);
    setAirConditioningOpen(false);
  };

  const handleResetBaseline = () => {
    setSelectedOrientation("");
    setSelectedWall("");
    setSelectedRoof("");
    setSelectedGlass("");
    setSelectedShading("");
    setSelectedLighting("");
    setSelectedAirConditioning("");

    // Close all accordion menus
    setOrientationOpen(false);
    setWallOpen(false);
    setRoofOpen(false);
    setGlassOpen(false);
    setShadingOpen(false);
    setLightingOpen(false);
    setAirConditioningOpen(false);
  };

  const renderSidebarContent = () => (
    <div className="space-y-4 flex-1">
      {/* Orientation */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setOrientationOpen(!orientationOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/navigate.svg" alt="navigate" className="w-8 h-8" />
          <h2 className="text-lg font-bold text-black">Orientation</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${orientationOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {orientationOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {orientationOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedOrientation === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="orientation"
                    checked={selectedOrientation === option.name}
                    onChange={() => {
                      setSelectedOrientation(option.name);
                      setOrientationOpen(false);
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

      {/* WALL */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setWallOpen(!wallOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/wall.svg" alt="wall" className="w-8 h-8" />
          <h2 className="text-lg font-bold text-black">Wall</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${wallOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {wallOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {wallOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedWall === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="wall"
                    checked={selectedWall === option.name}
                    onChange={() => {
                      setSelectedWall(option.name);
                      setWallOpen(false);
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

      {/* ROOF */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setRoofOpen(!roofOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/roof.svg" alt="roof" className="w-7 h-7" />
          <h2 className="text-lg font-bold text-black">Roof</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${roofOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {roofOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {roofOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedRoof === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="roof"
                    checked={selectedRoof === option.name}
                    onChange={() => {
                      setSelectedRoof(option.name);
                      setRoofOpen(false);
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

      {/* GLASS */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setGlassOpen(!glassOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/glass5.svg" alt="glass5" className="w-10 h-10" />
          <h2 className="text-lg font-bold text-black">Glass</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${glassOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {glassOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {glassOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedGlass === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="glass"
                    checked={selectedGlass === option.name}
                    onChange={() => {
                      setSelectedGlass(option.name);
                      setGlassOpen(false);
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

      {/* SHADING */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setShadingOpen(!shadingOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/shading.svg" alt="shading" className="w-7 h-7" />
          <h2 className="text-lg font-bold text-black">Shading</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${shadingOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {shadingOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {shadingOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedShading === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="shading"
                    checked={selectedShading === option.name}
                    onChange={() => {
                      setSelectedShading(option.name);
                      setShadingOpen(false);
                    }}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <img src={option.icon} alt={option.name} className="w-7 h-7 object-contain" />
                    <span className="text-black font-medium">{option.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTING */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setLightingOpen(!lightingOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/light.svg" alt="light" className="w-7 h-7" />
          <h2 className="text-lg font-bold text-black">Lighting</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${lightingOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {lightingOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {lightingOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedLighting === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="lighting"
                    checked={selectedLighting === option.name}
                    onChange={() => {
                      setSelectedLighting(option.name);
                      setLightingOpen(false);
                    }}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <img src={option.icon} alt={option.name} className="w-7 h-7 object-contain" />
                    <span className="text-black font-medium">{option.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AIR CONDITIONING */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-black hover:border-cyan-300 transition-all duration-300 overflow-hidden ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <button
          onClick={() => setAirConditioningOpen(!airConditioningOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300"
        >
          <img src="/icons/AC.svg" alt="AC" className="w-7 h-7" />
          <h2 className="text-lg font-bold text-black">AC</h2>
          <span className={`text-xl text-gray-900 transition-transform duration-300 ${airConditioningOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {airConditioningOpen && (
          <div className="p-4 border-t border-gray-600 space-y-4 bg-gray-50">
            <div className="space-y-4">
              {airConditioningOptions.map((option) => (
                <label
                  key={option.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    selectedAirConditioning === option.name ? "bg-cyan-50 border-2 border-cyan-500 shadow-md" : "bg-white border border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="airConditioning"
                    checked={selectedAirConditioning === option.name}
                    onChange={() => {
                      setSelectedAirConditioning(option.name);
                      setAirConditioningOpen(false);
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

      {/* Bottom Buttons */}
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

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[#eef2f5]">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-80 bg-white border-r border-gray-200 p-6 flex-col shadow-sm h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-4xl tracking-tight font-bold mb-10 text-gray-800">
          Select EE Measures
        </h2>
        {renderSidebarContent()}
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
          {renderSidebarContent()}
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

          {/* Analytics Panel */}
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
        </div>

        {/* Bottom EPI Section */}
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
      </div>
    </main>
  );
}
