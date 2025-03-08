
// Probability of distraction (0.0 to 1.0)
// Higher values mean more frequent distractions
const DISTRACTION_PROBABILITY = 0.3;

// Minimum time between distractions (in milliseconds)
const MIN_TIME_BETWEEN_DISTRACTIONS = 60000; // 1 minute

// Maximum time between distractions (in milliseconds)
const MAX_TIME_BETWEEN_DISTRACTIONS = 300000; // 5 minutes

let lastDistractionTime = 0;

export const shouldGenerateDistraction = (): boolean => {
  const now = Date.now();
  const timeSinceLastDistraction = now - lastDistractionTime;
  
  // Don't generate distractions too frequently
  if (timeSinceLastDistraction < MIN_TIME_BETWEEN_DISTRACTIONS) {
    return false;
  }
  
  // Always consider generating a distraction after the maximum time
  if (timeSinceLastDistraction > MAX_TIME_BETWEEN_DISTRACTIONS) {
    const shouldDistract = Math.random() < DISTRACTION_PROBABILITY * 2;
    if (shouldDistract) {
      lastDistractionTime = now;
    }
    return shouldDistract;
  }
  
  // Normal probability check
  const shouldDistract = Math.random() < DISTRACTION_PROBABILITY;
  if (shouldDistract) {
    lastDistractionTime = now;
  }
  return shouldDistract;
};

// For testing purposes only - force a distraction
export const forceDistraction = (): void => {
  lastDistractionTime = Date.now() - MAX_TIME_BETWEEN_DISTRACTIONS;
};

// Reset distraction timer (e.g., when starting a new day)
export const resetDistractionTimer = (): void => {
  lastDistractionTime = 0;
};
