// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/Home.screen";
import Sofa from "./screens/Sofa.info";
import SofasScreen from "./screens/Sofas.screen";

import Nav from "./components/navbar/Nav";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Nav />
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
