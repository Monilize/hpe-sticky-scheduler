import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to darken a hex color by a given percentage
export const darkenColor = (hex: string, percent: number): string => {
  let num = parseInt(hex.slice(1), 16); // Remove the '#' and convert hex to a number
  let amt = Math.round(2.55 * percent); // Calculate the amount to darken the color
  
  let r = (num >> 16) - amt; // Extract the red channel
  let g = ((num >> 8) & 0x00ff) - amt; // Extract the green channel
  let b = (num & 0x0000ff) - amt; // Extract the blue channel
  
  // Ensure the RGB values stay within the valid range [0, 255]
  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;
  
  // Recombine the channels and return the darkened color as a hex string
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};
