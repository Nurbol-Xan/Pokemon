import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import axios from "axios";
import InfoPoki from "./infoPoki.js"

export default function AboutPoki(){
    const [pokemon, setPokemon] = useState([])
    let { name } = useParams([]);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
          const { data } = res;
          // console.log(data.name);
          setPokemon([data])
          });
        // eslint-disable-next-line
    }, []);
        // console.log(pokemon);
    return (
        <><main id="app">
          <section className="cards">
            {pokemon.map((pokemon, index) => 
              <InfoPoki
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
                type={pokemon.types}
                height={pokemon.height}
                weight={pokemon.weight}
                ability={pokemon.abilities}
              />
            )}
          </section>
          </main>
        </>
    )
}