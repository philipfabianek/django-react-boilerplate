import React from "react";
import ReactDOM from "react-dom";

import 'normalize.css';
import "./app.css";

const Stuff = () => (
  <div>
    <h1>Django-React boilerplate</h1>
  </div>
);

ReactDOM.render(
  <Stuff />,
  document.getElementById("app")
);
