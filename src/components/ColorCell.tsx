import { Color } from "../models";
import { useAppContext } from "../state";
import { rgbToHex } from "../utils";

interface CellProps {
    color: Color
}

export function ColorCell(props: CellProps) {
    const { setIsCopyMessageVisible, setCopyMessage } = useAppContext();
    const toasterTimeMs = 3000;

    const copyColorToClipboard = () => {
        const hexColor = rgbToHex(props.color);
        navigator.clipboard.writeText(hexColor);
        showCopyMessage(`Copied ${hexColor}`);
    }

    const showCopyMessage = (message: string) => {
        setCopyMessage(message);
        setIsCopyMessageVisible(true);
        setTimeout(() => {
            setIsCopyMessageVisible(false);
        }, toasterTimeMs);
    }

    return <div onClick={copyColorToClipboard} class="cell" 
        style={{'background-color': `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`}}
    ></div>;
}