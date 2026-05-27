import { describe, it, expect } from 'vitest';
import { calculateSavings, Selections } from './calculations';

describe('calculateSavings', () => {
  const baselineSelections: Selections = {
    selectedOrientation: "",
    selectedWall: "",
    selectedRoof: "",
    selectedGlass: "",
    selectedShading: "",
    selectedLighting: "",
    selectedAirConditioning: "",
    selectedPartitionWall: "",
    wwr: 40,
    externalWindowOpening: 20,
    setpointTemperature: 24,
  };

  it('should return baseline values when no selections are made', () => {
    const result = calculateSavings(baselineSelections);
    expect(result.pct).toBe(0);
    expect(result.currentEpi).toBe(180);
    expect(result.energySavings).toBe(0);
    expect(result.co2Savings).toBe(0);
    expect(result.moneySavings).toBe(0);
  });

  it('should calculate correct savings for the Best Combination', () => {
    const bestSelections: Selections = {
      ...baselineSelections,
      selectedOrientation: "North", // +2%
      selectedWall: "AAC Block", // +15%
      selectedRoof: "RRC + Insulation", // +20%
      selectedGlass: "Double Glazing(12mm)", // +15%
      selectedShading: "5 Ft Shading", // +10%
      selectedLighting: "LED", // +12%
      selectedAirConditioning: "5 Star AC", // +18%
    };
    // Total expected pct: 2 + 15 + 20 + 15 + 10 + 12 + 18 = 92%

    const result = calculateSavings(bestSelections);
    expect(result.pct).toBe(92);
    
    // currentEpi = Math.max(50, Math.round(180 * (1 - 0.92))) 
    // 180 * 0.08 = 14.4 -> rounded to 14. Max(50, 14) = 50.
    expect(result.currentEpi).toBe(50);

    // energySavings = 50000 * 0.92 = 46000
    expect(result.energySavings).toBe(46000);

    // co2Savings = 46000 * 0.82 = 37720
    expect(result.co2Savings).toBe(37720);

    // moneySavings = 46000 * 8 = 368000
    expect(result.moneySavings).toBe(368000);
  });

  it('should handle orientation specific percentages', () => {
    const northResult = calculateSavings({ ...baselineSelections, selectedOrientation: "North" });
    expect(northResult.pct).toBe(2);

    const eastResult = calculateSavings({ ...baselineSelections, selectedOrientation: "East" });
    expect(eastResult.pct).toBe(1);

    const southResult = calculateSavings({ ...baselineSelections, selectedOrientation: "South" });
    expect(southResult.pct).toBe(0.5);
  });

  it('should handle wall specific percentages', () => {
    const flyAshResult = calculateSavings({ ...baselineSelections, selectedWall: "Fly Ash Brick" });
    expect(flyAshResult.pct).toBe(8);

    const aacResult = calculateSavings({ ...baselineSelections, selectedWall: "AAC Block" });
    expect(aacResult.pct).toBe(15);
  });

  it('should cap the currentEpi at a minimum of 50', () => {
    // Force a very high percentage
    const extremeSelections: Selections = {
        ...baselineSelections,
        selectedRoof: "RRC + Insulation", // 20%
        selectedWall: "AAC Block", // 15%
        selectedAirConditioning: "5 Star AC", // 18%
        selectedGlass: "Double Glazing(12mm)", // 15%
        selectedLighting: "LED", // 12%
        selectedShading: "5 Ft Shading", // 10%
        selectedOrientation: "North" // 2%
    };
    // Total 92% (same as best combo)
    
    const result = calculateSavings(extremeSelections);
    expect(result.currentEpi).toBe(50);
  });
});
