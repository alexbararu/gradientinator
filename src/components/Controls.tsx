import { createEffect, createRenderEffect, createSignal, onMount, Show } from "solid-js";
import { useAppContext } from "../state";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            model: [() => any, (v: any) => any, 'string' | 'number'];
        }
    }
}

function model(el, value) {
    const [field, setField, type] = value();
    createRenderEffect(() => (el.value = field()));
    el.addEventListener("input", (e) => {
        switch (type) {
            case 'string':
                setField(e.target.value);
                break;
            case 'number':
                const intValue = e.target.value === '' ? '0' : e.target.value;            
                setField(parseInt(intValue));
                break;
        }
        
    });
}

export function Controls() {
    const defaultRowsNumber = 6;
    const defaultColsNumber = 6;
    const [ isMenuOpen, setIsMenuOpen ] = createSignal(false);
    const [ numberOfColors, setNumberOfColors ] = createSignal<2 | 4>(4);
    const {
        rowsNumber, setRowsNumber,
        columnsNumber, setColumnsNumber,
        topLeftColorHex, setTopLeftColorHex,
        topRightColorHex, setTopRightColorHex,
        bottomLeftColorHex, setBottomLeftColorHex,
        bottomRightColorHex, setBottomRightColorHex
    } = useAppContext();

    createEffect(() => {
        if (numberOfColors() === 4) {
            setRowsNumber(defaultRowsNumber);
            setColumnsNumber(defaultColsNumber);
        } else {
            setColumnsNumber(defaultColsNumber);
            setRowsNumber(1);
        }
    });

    onMount(() => {
        if (window.screen.width > 600) {
            setIsMenuOpen(true);
        }
    })

    return <div class="controls-container" classList={{ 'opened': isMenuOpen() }}>
        <h1 class="main-title">
            <div class="small-text">
                <span class="the">The</span>
            </div>
            Gradientinator
        </h1>
        <h3>Settings</h3>
        <div class="control">
            <label>Number of Colors:</label>
            <div class="radio-control">
                <div>
                    <input checked={numberOfColors() === 2} name="colorsNumber" value="2" type="radio" />
                    <label onClick={() => setNumberOfColors(2)} for="2">2 Colors</label>
                </div>
                <div>
                    <input checked={numberOfColors() === 4}  name="colorsNumber" value="4" type="radio" />
                    <label onClick={() => setNumberOfColors(4)} for="4">4 Colors</label>
                </div>
            </div>
        </div>
        <Show when={numberOfColors() === 2}>            
            <div class="control">
                <label for="topLeftColor">Left Color:</label>
                <input name="topLeftColor" type="color" use:model={[topLeftColorHex, setTopLeftColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="topRightColor">Right Color:</label>
                <input name="topRightColor" type="color" use:model={[topRightColorHex, setTopRightColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="columnsNumber">Columns Number:</label>
                <input name="columnsNumber" type="number" use:model={[columnsNumber, setColumnsNumber, 'number']} />
            </div>
        </Show>
        <Show when={numberOfColors() === 4}>
            <div class="control">
                <label for="topLeftColor">Top Left Color:</label>
                <input name="topLeftColor" type="color" use:model={[topLeftColorHex, setTopLeftColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="topRightColor">Top Right Color:</label>
                <input name="topRightColor" type="color" use:model={[topRightColorHex, setTopRightColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="bottomLeftColor">Bottom Left Color:</label>
                <input name="bottomLeftColor" type="color" use:model={[bottomLeftColorHex, setBottomLeftColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="bottomRightColor">Bottom Right Color:</label>
                <input name="bottomRightColor" type="color" use:model={[bottomRightColorHex, setBottomRightColorHex, 'string']} />
            </div>
            <div class="control">
                <label for="rowsNumber">Rows Number:</label>
                <input name="rowsNumber" type="number" use:model={[rowsNumber, setRowsNumber, 'number']} />
            </div>
            <div class="control">
                <label for="columnsNumber">Columns Number:</label>
                <input name="columnsNumber" type="number" use:model={[columnsNumber, setColumnsNumber, 'number']} />
            </div>
        </Show>
        <button class="mobile-button" onClick={() => setIsMenuOpen(false)}>Apply Gradient</button>
        <button class="mobile-open-button" onClick={() => setIsMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </button>
        <button class="desktop-hide-menu-button" onClick={() => setIsMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            Hide Settings
        </button>
    </div>
}