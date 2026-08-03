import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from ".";

function RoutesRenderer() {
  return useRoutes(routes);
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RoutesRenderer />
    </BrowserRouter>
  );
}
