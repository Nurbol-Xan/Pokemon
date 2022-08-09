import "../CSS/App.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./PokemonThumnail.js";
import Pagination from "./Pagination.js"
import axios from "axios"
import SearchPokemon from "./SearchPokemon.js";

export default function  About() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cansler;
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(c => cansler = c)
    }).then(res => {
      setLoading(false)
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
  
      function createPokemonObj(result){
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()

          setPokemon(currentList => [...currentList, data])
        })
      }
      createPokemonObj(res.data.results)
    
    })
   
    return () => cansler()
  }, [currentPage])

  function toNextPage(){
    setCurrentPage(nextPage)
  }
  // console.log(pokemon)
  function toPrevPage(){
    setCurrentPage(prevPage)
  }
  if (loading) return "Loading..."

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <SearchPokemon />
      <div className="pokemon-container">
        <main id="app">
          <section className="cards">
            {pokemon.map((pokemon, index) => {
              // console.log(pokemon);
              <PokemonThemnail
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              />
            })}  
          </section>
        </main>
        <Pagination 
          toNextPage={nextPage ? toNextPage : null}
          toPrevPage={prevPage ? toPrevPage : null} 
        />
      </div>
    </div>
  )
}