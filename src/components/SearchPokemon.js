import {useEffect, useState} from "react"
import PokemonThemnail from "./PokemonThumnail";
import axios from "axios"

export default function SearchPokemon(){
        const [currentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=1")
        const [AllPokemon, setAllPokemon] = useState([])
        const [searchPoki, setSearchPoki] = useState('')

        useEffect(() => {
                axios.get("https://pokeapi.co/api/v2/pokemon?limit=1154")
                .then(res => {
                  createPokemonObj(res.data.results)
            
                  function createPokemonObj(result){
                    result.forEach(async (pokemon) => {
                      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                      const data = await res.json()
                      setAllPokemon(currentList => [...currentList, data])
                    })
                  }
                })
        },[currentPage])

        return (
                <>
                        <input 
                                type="text"
                                placeholder="Search..."
                                onChange={(even) => {
                                setSearchPoki(even.target.value)
                                }}
                        />

                        <main id="app">
                                <section className="cards">
                                        {AllPokemon.filter((val) => {
                                                if(searchPoki !== "" && val.name.toLowerCase().includes(searchPoki.toLocaleLowerCase())){
                                                        return val
                                                }
                                        }).map((pokemon, index) => 
                                                <PokemonThemnail
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