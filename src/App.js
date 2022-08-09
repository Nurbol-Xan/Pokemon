import "./CSS/index.css";
import {useState, useEffect} from "react"
import PokemonThemnail from "./components/PokemonThumnail";
import Pagination from "./components/Pagination.js"
import axios from "axios"

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=1")
  const [AllPokemon, setAllPokemon] = useState([])
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoading] = useState(true)
  const [searchPoki, setSearchPoki] = useState('')

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

      // AllPokemon.map((res) => {
      //   console.log(res)
      // })
      function createPokemonObj(result){
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()
        
          // console.log(data)
          setPokemon(currentList => [...currentList, data])
        })
      }
    }).catch((e)=>console.log(e))
    return () => cansler()
  }, [currentPage])

  // 
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1154")
    .then(res => {
      // console.log(res.data.results)
      
      // console.log(AllPokemon)
      createPokemonObj(res.data.results)

      function createPokemonObj(result){
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()
        
          // console.log(data)
          setAllPokemon(currentList => [...currentList, data])
        })
      }
    // }).catch((e)=>console.log(e))
    })
  },[loading])

  function toNextPage(){
    setCurrentPage(nextPage)
  }
  // console.log(pokemon)
  // console.log(AllPokemon)
  // AllPokemon.map((e) => console.log(e.name))
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
        {/* AllPokemon.map((val) => {
                  if (searchPoki == ""){
                    console.log(val)
                    return val
                  }else if(searchPoki === val.name.toString()){
                    return val
                  }
                }) */}
    
      

      <div className="pokemon-container">
        <main id="app">
          <section className="cards">
            
                {AllPokemon.filter((val) => {
                  if (searchPoki === ""){
                    return val
                  }else if(
                    val.name.toLowerCase().includes(searchPoki.toLocaleLowerCase())
                  ){
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
        <Pagination 
          toNextPage={nextPage ? toNextPage : null}
          toPrevPage={prevPage ? toPrevPage : null} 
        />
      </div>
    </div>
  );
}

export default App;
