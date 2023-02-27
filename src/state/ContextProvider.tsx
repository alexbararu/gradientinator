import { createContext, createSignal, useContext } from "solid-js";

export const createAppContext = () => {
    const [rowsNumber, setRowsNumber] = createSignal(6);
    const [columnsNumber, setColumnsNumber] = createSignal(6);

    const [topLeftColorHex, setTopLeftColorHex] = createSignal('#a18cd1');
    const [topRightColorHex, setTopRightColorHex] = createSignal('#fbc2eb');
    const [bottomLeftColorHex, setBottomLeftColorHex] = createSignal('#96e6a1');
    const [bottomRightColorHex, setBottomRightColorHex] = createSignal('#d4fc79');

    const [copyMessage, setCopyMessage] = createSignal('');
    const [isCopyMessageVisible, setIsCopyMessageVisible] = createSignal(false);

    return {
      rowsNumber, setRowsNumber,
      columnsNumber, setColumnsNumber,
      topLeftColorHex, setTopLeftColorHex,
      topRightColorHex, setTopRightColorHex,
      bottomLeftColorHex, setBottomLeftColorHex,
      bottomRightColorHex, setBottomRightColorHex,
      copyMessage, setCopyMessage,
      isCopyMessageVisible, setIsCopyMessageVisible,
    };
}

type AppContextType = ReturnType<typeof createAppContext>;

const AppContext = createContext<AppContextType>();

export const useAppContext = () => useContext(AppContext);

export function ContextProvider(props) {
    return (
        <AppContext.Provider value={createAppContext()}>
          {props.children}
        </AppContext.Provider>
      );
}