import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const loader = useRef()

    const getPokemons = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://app.prepend.test/api/pokemons?page=${page}`)
            setPokemons((prev) => {
                return [...new Set([ ...prev, ...data.data ])]
            })
            setLastPage(data.meta.last_page)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [page])

    useEffect(() => {
        getPokemons()
    }, [getPokemons, page])
    
    const handleObserver = useCallback((entities) => {
        const target = entities[0]
        if(!target.isIntersecting) {
            // console.log(target)
            return
        }
        
        if(lastPage === page) {
            return
        }
        
        setPage((prev) => prev + 1)
    }, [])
    
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        }

        const observer = new IntersectionObserver(handleObserver, options)
        if(loader.current) observer.observe(loader.current)
    }, [handleObserver])

    // console.log(page)
    // console.log(lastPage)
    
    
  return (
    <>
        <div className='container'>
            <h3 className='text-center mt-2'>Pokemons</h3>
            <div className="row row-cols-4 mt-3">
            {
                pokemons.length > 0 && pokemons.map(pokemon => (
                    <div className="card" style={{width: "18rem"}} key={pokemon.id}>
                        <div className="card-body">
                            <h5 className="card-title">Identifier: {pokemon.identifier}</h5>
                            <p className="card-text">Height: {pokemon.height} m</p>
                            <p className="card-text">Weight: {pokemon.weight} g</p>
                            <p className="card-text">Order: {pokemon.order}</p>
                            <Link to={`/pokemon/${pokemon.id}`} className="card-link">Show</Link>
                        </div>
                    </div>
            ))
            }
            </div>
            <div ref={loader}>
                <span style={{ display: loading ? "block" : "none" }}>Loading...</span>
            </div>
        </div>
    </>
  )
};

export default Home;
