import "./CSS/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  Navigate
} from "react-router-dom";
import Pokemons from "./components/Pokemons.js"
import Pokemon from "./components/AboutPoki.js"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/pokemon"/>} />
          <Route path="/pokemon" element={<Pokemons />}/>
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
