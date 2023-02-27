import { createSignal } from "solid-js";
import { useAppContext } from "../state"

export function CopyMessage() {
    const [ isFadeOut, setIsFadeOut ] = createSignal(false);
    const { copyMessage } = useAppContext();

    setTimeout(() => setIsFadeOut(true), 2000);

    return <div class="copy-message-container" classList={{ 'fade-out': isFadeOut() }}>
        { copyMessage() }
    </div>
}