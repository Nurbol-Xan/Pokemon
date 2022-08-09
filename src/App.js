import "./CSS/App.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./components/PokemonThumnail";
import Pagination from "./components/Pagination.js"
import axios from "axios"
import SearchPokemon from "./components/SearchPokemon.js";

function App() {
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
      createPokemonObj(res.data.results)
            
      function createPokemonObj(result){
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()
          setPokemon(currentList => [...currentList, data])
        })
      }
    })

    return () => cansler()
  }, [currentPage])

  function toNextPage(){
    setCurrentPage(nextPage)
  }

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
  );
}

export default App;
