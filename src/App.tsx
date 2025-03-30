import "./App.css";
import { GridProvider } from "./app/cuadricula/data-access/provider/grid.provider";
import { SelectedColorProvider } from "./app/cuadricula/data-access/provider/selected-color.provider";
import { LienzoComponent } from "./app/cuadricula/feature/lienzo.component";

const App = () => (
  <SelectedColorProvider>
    <GridProvider>
      <LienzoComponent />
    </GridProvider>
  </SelectedColorProvider>
);

export default App;
