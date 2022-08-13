import "../CSS/infoPoki.css"
import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link
  } from "react-router-dom";

const InfoPoki = ({id, name, image, type, height, weight, ability}) => {
    // console.log(ability)
    return (
        <>  
            <h1>Information</h1>
            <Link to="/"  className="link-n">
                <div class="frame"> 
                    <button class="custom-btn btn"><span>All Pokemons</span></button>
                </div>
            </Link>
            <div className="info">
                <img src={image} alt={name} className="img-info"/><br/>
                <div className="info-title">
                    <h3>ID: <small>{id}</small></h3>
                    <h3>Name: <small>{name}</small></h3>
                    <h3>Type: {type.map((go) => 
                        <>
                            <small className="type">{go.type.name}</small><br />
                        </>
                    )}</h3>
                </div>
                <div className="info-title">
                    <h3>Height: <small>{height}</small></h3>
                    <h3>Weight: <small>{weight}</small></h3>
                    <h3>Ability: {ability.map((abt) => 
                        <>
                            <small className="type">{abt.ability.name}</small><br />
                        </>
                    )}</h3>
                </div>
            </div>  
        </>
    )
}

export default InfoPoki;