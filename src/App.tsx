import { Route, Routes } from "react-router";
import "./styles.css";

import HomePage from "./pages/HomePage.js";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
