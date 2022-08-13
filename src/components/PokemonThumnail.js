import "../CSS/PokemonThumnail.css";
import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link
  } from "react-router-dom";
import Pokemon from "./AboutPoki.js"

const PokemonThemnail = ({pokemon,id, name, image, type}) => {
    // console.log(name)
    return (
        <>  <Link to={`/pokemon/${name}`} pokemon={pokemon} className="link">
                <div className="card">
                    <img src={image} alt={name} className="img-card"/><br/>
                    <div className="card-title">
                        <small>#{id}</small>
                        <h3 className="pokemon-name">{name}</h3>
                        <Pokemon pokemon={pokemon}/>
                        <small>Type: {type.map((go) => 
                            <>
                                <small className="type">{go.type.name}</small><br />
                            </>
                        )}</small>
                    </div>
                </div>  
            </Link>
        </>
    )
};

export default PokemonThemnail;

