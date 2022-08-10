import "../CSS/App.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./PokemonThumnail.js";
import Pagination from "./Pagination.js"
import axios from "axios"
// import SearchPokemon from "./SearchPokemon.js";

export default function  About() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)
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
  },[])

  useEffect(() => {
    setLoading(true)
    let cansler;
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(c => cansler = c)
    }).then(res => {
      setLoading(false)
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
      setPokemon([])
      function createPokemonObj(result){
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()

          setPokemon(currentList => [...currentList, data])
        })
      };

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
      <input 
        type="text"
        placeholder="Search..."
        onChange={(even) => {
        setSearchPoki(even.target.value)
        }}
      />
      <div className="pokemon-container">
        <main id="app">
          
          <section className="cards">
            {/* eslint-disable-next-line */}
          {searchPoki?(AllPokemon.filter((val) => {
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
            )):(
              pokemon?.map((pokemon, index) => 
              <PokemonThemnail
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              />
            ) )}
            
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