import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <h1>
        <Link to="/sofas"> Sofas</Link>
      </h1>
      HOLA THIS IS HOMESCREEN
    </div>
  );
};

export default HomeScreen;
