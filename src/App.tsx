import "./App.css";
import { SelectedColorProvider } from "./app/cuadricula/data-access/provider/selected-color.provider";
import { LienzoComponent } from "./app/cuadricula/feature/lienzo.component";

const App = () => (
  <SelectedColorProvider>
    <LienzoComponent />
  </SelectedColorProvider>
);

export default App;
