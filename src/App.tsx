import { Component, Show } from 'solid-js';
import './App.scss';
import { GradientMatrix, Controls, CopyMessage } from './components';
import { useAppContext } from './state';

const App: Component = () => {
  const { isCopyMessageVisible } = useAppContext();
  return (
    <>
      <div class='app-container'>
        <section class='main-section'> 
          <Controls />
          <GradientMatrix />
        </section>
        <Show when={isCopyMessageVisible()}>
          <CopyMessage />
        </Show>
      </div>
    </>
  );
};

export default App;
