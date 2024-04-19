import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
    <Router>
      <Routes />
    </Router>
    </NextUIProvider>
  );
}

export default App;
