// import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/Home.screen";
import Sofa from "./screens/Sofa.info";
import SofasScreen from "./screens/Sofas.screen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark" />
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Kápiton</Navbar.Brand>
            </LinkContainer>
          </Container>
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
