import React from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"; 

function Head({ style }) {
  return (
    <>
      <div className="text-center" style={style}>
        <h1 style={{ zIndex: "22" }}><b>BirdCLEF</b></h1>
      </div>
    </>
  );
}

export default Head;
