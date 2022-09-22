// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Sofa from "./screens/SofaInfo";
import SofasScreen from "./screens/SofasScreen";

import Nav from "./components/navbar/Nav";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ChairScreen from "./screens/ChairScreen";
import TableScreen from "./screens/TableScreen";
import Footer from "./components/footer/Footer";
import ChairInfo from "./screens/ChairInfo";

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
            <Route path="/chairs" element={<ChairScreen />}></Route>
            <Route path="/chair/:slug" element={<ChairInfo />} />
            <Route path="/tables" element={<TableScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
