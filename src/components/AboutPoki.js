import {useEffect, useState} from "react"
import { useLocation,Link,useParams } from 'react-router-dom'
import axios from "axios";
import PokemonThemnail from "./PokemonThumnail.js";

export default function AboutPoki(){
    const [pokemon, setPokemon] = useState([])
    let { name } = useParams([]);
    // console.log(name);
    // useEffect(() => {
    //   setLoading(true)
    //   axios.get("https://pokeapi.co/api/v2/pokemon?limit=1154")
    //   .then(res => {
    //     setLoading(false)
    //     createPokemonObj(res.data.results)
    //     function createPokemonObj(result){
    //       result.forEach(async (pokemon) => {
    //         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    //         const data = await res.json()
    //         setAllPokemon(currentList => [...currentList, data])
    //       })
    //     }
    //   })
    // },[])
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
          const { data } = res;
          // console.log(data.name);
          setPokemon([data])
          });
    }, []);
        // console.log(pokemon);
    return (
        <><main id="app">
          <section className="cards">
            {pokemon.map((pokemon, index) => 
              <PokemonThemnail
                pokemon={pokemon}
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              />
            )}
          </section>
          </main>
        </>
    )
}