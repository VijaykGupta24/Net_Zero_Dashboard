export interface Selections {
  selectedOrientation: string;
  selectedWall: string;
  selectedRoof: string;
  selectedGlass: string;
  selectedShading: string;
  selectedLighting: string;
  selectedAirConditioning: string;
}

export interface SavingsResult {
  pct: number;
  currentEpi: number;
  energySavings: number;
  co2Savings: number;
  moneySavings: number;
}

export const calculateSavings = (selections: Selections): SavingsResult => {
  const {
    selectedOrientation,
    selectedWall,
    selectedRoof,
    selectedGlass,
    selectedShading,
    selectedLighting,
    selectedAirConditioning,
  } = selections;

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

  const baseEpi = 180;
  const currentEpi = Math.max(50, Math.round(baseEpi * (1 - pct / 100)));

  const baseEnergy = 50000;
  const energySavings = pct > 0 ? Math.round(baseEnergy * (pct / 100)) : 0;
  const co2Savings = pct > 0 ? Math.round(energySavings * 0.82) : 0;
  const moneySavings = pct > 0 ? Math.round(energySavings * 8) : 0;

  return {
    pct,
    currentEpi,
    energySavings,
    co2Savings,
    moneySavings,
  };
};
