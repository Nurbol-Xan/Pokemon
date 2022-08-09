import "./CSS/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Pokemons from "./components/Pokemons.js"

function App() {



  return (
    <>
      <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/pokemon">Home</Link>
                </li>
              </ul>
            </nav>
          <Routes>
            <Route path="/pokemon" element={<Pokemons />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
