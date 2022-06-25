// import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/Home.screen";
import Sofa from "./screens/Sofa.info";

import SofasScreen from "./screens/Sofas.screen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/">Kápiton</Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/sofas" element={<SofasScreen />} />
            <Route path="/sofa/:slug" element={<Sofa />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
