import { Color } from "../models";

export function hexToRGB(hexColor: string): Color {
    const hexCode = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    const rgbHex = hexCode.match(/.{1,2}/g);
    return {
        r: parseInt(rgbHex[0], 16),
        g: parseInt(rgbHex[1], 16),
        b: parseInt(rgbHex[2], 16)
    };
}

export function rgbToHex(rgbColor: Color): string {
    const r = rgbColor.r.toString(16).padStart(2, '0');
    const g = rgbColor.g.toString(16).padStart(2, '0');
    const b = rgbColor.b.toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}