import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCarNameForDisplay(carName) {
  if (!carName) return "Team";
  // Decode URI component (e.g., %20 to space), replace hyphens, and capitalize words
  return decodeURIComponent(carName)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
