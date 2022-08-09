import "../CSS/PokemonThumnail.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Pokemon from "./AboutPoki.js"

const PokemonThemnail = ({id, name, image, type}) => {
    return (
        <>
            <div className="card">
                {/* <Link to={`/pokemon/${id}`}> */}
                <img src={image} alt={name} className="img-card"/><br/>
                <div className="card-title">
                    <small>#{id}</small>
                    <h3 className="pokemon-name">{name}</h3>
                    <small>Type: {type}</small>
                </div>
                {/* </Link> */}
            </div>
            {/* <Router>
                   
                <Routes>
                    <Route path="/pokemon/:id" element={<Pokemon />}/>
                </Routes>
            </Router> */}
        </>
    )
};

export default PokemonThemnail;

