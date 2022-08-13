import "./CSS/App.css";
import React, { Suspense }  from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  Navigate
} from "react-router-dom";
const Pokemons = React.lazy(() => import("./components/Pokemons.js"));
const Pokemon = React.lazy(() => import("./components/AboutPoki.js"));


function App() {
  return (
    <>
      <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/pokemon"/>} />
          <Route path="/pokemon" element={<Pokemons />}/>
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
