import React from "react";
import { useParams } from "react-router-dom";
// import data from "../data";

const Sofa = () => {
  const params = useParams();
  const { slug } = params;
  return <div>{slug}</div>;
};

export default Sofa;
