import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "./routes";
import tempoRoutes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other explicit routes here if needed */}
        </Routes>
        {/* Use route objects */}
        {useRoutes(routes)}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
      </div>
    </Suspense>
  );
}

export default App;
