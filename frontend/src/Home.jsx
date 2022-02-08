import { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            try {
                const { data } = await axios.get(`http://app.prepend.test/api/pokemons`)
                setPokemons(data)
            } catch (error) {
                console.log(error)
            }
        }
        getPokemons()
    }, [])
    console.log(pokemons)
  return pokemons ? (
      <>
        <div className='container'>
            {
               pokemons && pokemons.map(pokemon => (
                    <div className="card" style={{"width": "18rem"}} key={pokemon.id}>
                    <div className="card-body">
                        <h5 className="card-title">Identifier: {pokemon.identifier}</h5>
                        <p className="card-text">Height: {pokemon.height}</p>
                        <p className="card-text">Weight: {pokemon.weigth}</p>
                        <p className="card-text">Order: {pokemon.order}</p>
                        <a href="/" className="card-link">Edit</a>
                    </div>
                    </div>
               ))
            }
        </div>
      </>
  ) :
  (
      <>
        ...loading
      </>
  );
};

export default Home;
