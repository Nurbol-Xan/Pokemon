import {useEffect, useState} from "react"
import { useLocation,Link,useParams } from 'react-router-dom'
import axios from "axios";
import PokemonThemnail from "./PokemonThumnail.js";

export default function AboutPoki(){
    const [pokemon, setPokemon] = useState([])
    let { name } = useParams();
    // console.log(name);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
          const { data } = res;
        //   console.log(data.name);
          setPokemon(data)
          });
        },[]);
        console.log(pokemon);
    return (
        <>
            <h1>{pokemon.name}</h1><br/>
            <img src={pokemon.image} alt={name} className="img-card"/><br/>
            <h1>{pokemon.order}</h1>
        </>
    )
}