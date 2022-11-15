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
// import Footer from "./components/footer/Footer";
import ChairInfo from "./screens/ChairInfo";
import TableInfo from "./screens/TableInfo";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

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
            <Route path="/table/:slug" element={<TableInfo />} />
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/signup" element={<SignupScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/payment" element={<PaymentMethod />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
