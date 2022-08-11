import "../CSS/App.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./PokemonThumnail.js";
import Pagination from "./Pagination.js"
import axios from "axios"
export default function  About(){
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=6")
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)
  const [AllPokemon, setAllPokemon] = useState([])
  const [searchPoki, setSearchPoki] = useState('')
  useEffect(() => {
    setLoading(true)
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1154")
    .then(res => {
      setLoading(false)
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
  function toPrevPage(){
    setCurrentPage(prevPage)
  }
  if (loading) return <><div className="loading"><img src="http://a.top4top.net/p_1990j031.gif" alt="Loading"/></div></>
  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="search-wrapper">
        <input type="text" name="focus" required className="search-box" placeholder="Pokemon search..." 
         onChange={(even) => {
          setSearchPoki(even.target.value)
          }}/>
      </div>
      <div className="pokemon-container">	
      <div id="slider">
				<div className="slide">
        <main id="app">
          <section className="cards">
            {/* eslint-disable-next-line */}
          {searchPoki?(AllPokemon.filter((val) => {
            setLoading(true)
              if(searchPoki !== "" && val.name.toLowerCase().includes(searchPoki.toLocaleLowerCase())){
                setLoading(false)
                return val
              }
            }).map((pokemon, index) => 
              <PokemonThemnail
                pokemon={pokemon}
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              />
            )):(
              pokemon?.map((pokemon, index) => 
              <PokemonThemnail
                pokemon={pokemon}
                id={pokemon.id}
                name={pokemon.name}
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
              />
            ))}
          </section>
        </main>
        </div>
			</div>
        {searchPoki?( null ):(
        <Pagination 
          toNextPage={nextPage ? toNextPage : null}
          toPrevPage={prevPage ? toPrevPage : null} 
        />)}
      </div>
    </div>
  )}