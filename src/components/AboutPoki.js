import { useParams } from "react-router-dom";
import {useEffect} from "react"

export default function AboutPoki(){
    let { id } = useParams();

    // useEffect(() => {
    //   getPokemon(id);
    // }, []);
    return (
        <>
            {/* {pokemon.name} */}<h1>Stoped error</h1>
        </>
    )
}