import "./CSS/index.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./components/PokemonThumnail";
import Pagination from "./components/Pagination.js"
import axios from "axios"

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadmore] = useState("https://pokeapi.co/api/v2/pokemon?limit=2")
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    // setLoadmore(data.next)
    setNextPage(data.next)
    setPrevPage(data.previous)

    function createPokemonObj(result){
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObj(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  }, []);
  

  // useEffect(() => {
  //   setLoading(true)
  //   let cansler;
  //   axios.get(loadMore, {
  //     cancelToken: new axios.CancelToken(c => cansler = c)
  //   }).then(res => {
      

  //     setLoading(false)
  //     // setAllPokemons(res.data)
  //     setNextPage(res.data.next)
  //     setPrevPage(res.data.previous)
  //   })

  //   return () => cansler()
  // }, [loadMore])

  function toNextPage(){
    setLoadmore(nextPage)
  }

  function toPrevPage(){
    setLoadmore(prevPage)
  }
  // if (loading) return "Loading..."


  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <main id="app">
          <section class="cards">
                {allPokemons.map((pokemon, index) => 
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
        <Pagination 
          toNextPage={nextPage ? toNextPage : null}
          toPrevPage={prevPage ? toPrevPage : null} 
        />
      </div>
    </div>
  );
}

export default App;
