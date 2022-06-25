// import "./App.css";

import data from "./data";

function App() {
  return (
    <div className="App">
      <header>
        <a href="/">Kápiton</a>
      </header>
      <main>
        <h1>Sofas</h1>
        {data.sofas.map((sofa) => (
          <div>
            <img width="200px" src={sofa.image} alt="" />
            <h5>{sofa.name}</h5>
            <p>{sofa.brief}</p>
            <p>${sofa.price} USD</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
