import "../CSS/PokemonThumnail.css";

const PokemonThemnail = ({id, name, image, type}) => {
    return (
        <>
            <div className="card">
                <img src={image} alt={name} className="img-card"/><br/>
                <div className="card-title">
                    <small >#0{id}</small>
                    <h3 className="pokemon-name">{name}</h3>
                    <small>Type: {type}</small>
                </div>
            </div>
        </>
    )
};

export default PokemonThemnail;

