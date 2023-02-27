import { Index } from "solid-js";
import { useAppContext } from "../state";
import { hexToRGB } from "../utils";
import { ColorCell } from "./ColorCell";

export function GradientMatrix() {
    const { 
        rowsNumber,
        columnsNumber,
        topLeftColorHex,
        topRightColorHex,
        bottomLeftColorHex,
        bottomRightColorHex,
     } = useAppContext();

    const rows = () => [...new Array(rowsNumber())];
    const columns = () => [...new Array(columnsNumber())];

    const topLeftColorRGB = () => hexToRGB(topLeftColorHex());
    const topRightColorRGB = () => hexToRGB(topRightColorHex());
    const bottomLeftColorRGB = () => hexToRGB(bottomLeftColorHex());
    const bottomRightColorRGB = () => hexToRGB(bottomRightColorHex());
    

    function generateColorIntensity(color: 'r' | 'g' | 'b', intensities) {
        return Math.floor((
            topLeftColorRGB()[color] * intensities.topLeftIntensity + 
            topRightColorRGB()[color] * intensities.topRightIntensity +
            bottomLeftColorRGB()[color] * intensities.bottomLeftIntensity +
            bottomRightColorRGB()[color] * intensities.bottomRightIntensity
            ) / intensities.maxIntensity
        );
    }

    function generateColor(rowIndex, colIndex) {
        const columnsNumberHandle = () => columnsNumber() === 1 ? 2 : columnsNumber();
        const rowsNumberHandle = () => rowsNumber() === 1 ? 2 : rowsNumber();
        const intensities = {
            topLeftIntensity: (columnsNumberHandle() - colIndex - 1) * (rowsNumberHandle() - rowIndex - 1),
            topRightIntensity: colIndex * (rowsNumberHandle() - rowIndex - 1),
            bottomLeftIntensity: (columnsNumberHandle() - colIndex - 1) * rowIndex,
            bottomRightIntensity: colIndex * rowIndex,
            maxIntensity: (columnsNumberHandle() - 1) * (rowsNumberHandle() - 1),
        }
        const r = generateColorIntensity('r', intensities);
        const g = generateColorIntensity('g', intensities);
        const b = generateColorIntensity('b', intensities);
        return { r, g, b};
    }

    return <div id="gradient-matrix" style={{
        'grid-template-columns': `repeat(${columnsNumber()}, 1fr)`,
        'grid-template-rows': `repeat(${rowsNumber()}, 1fr)`
    }}>
        <Index each={rows()}>{(_, rowIndex) => 
            <Index each={columns()}>{(_, colIndex) =>
                <ColorCell color={generateColor(rowIndex, colIndex)}/>
            }</Index>
        }</Index>
    </div>;
}