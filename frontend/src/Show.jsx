import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

const Show = () => {
    const [pokemon, setPokemon] = useState([]);
    const [editting, setEditting] = useState(false)
    const { id } = useParams()
    const identifier = useRef()
    const height = useRef()
    const weight = useRef()

    

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const { data } = await axios.get(`http://app.prepend.test/api/pokemons/${id}`)
                setPokemon(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPokemon()
    }, [id])

    const toggleEdit = () => {
        setEditting(!editting)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const form = {
            identifier: identifier.current.value,
            height: height.current.value,
            weight: weight.current.value,
        }

        try {
            const { data } = await axios.put(`http://app.prepend.test/api/pokemons/${id}`, form)
            setPokemon((prev) => {
                return {
                    ...prev,
                    ...form
                }
            })
            toggleEdit()
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
        
    }
    
  return (
    <div className='container'>
        <div className="card mt-5">
        <div className="card-header">
            Featured Pokemon
        </div>
        <div className="card-body">
            <h5 className="card-title">{pokemon.identifier}</h5>
            <p className="card-text">Height: {pokemon.height} m</p>
            <p className="card-text">Weight: {pokemon.weight} g</p>
            <p className="card-text">Order: {pokemon.order}</p>
            <p className="card-text">Expires: {pokemon.base_experience}</p>
            {
                editting && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="identifier" className="col-form-label">Identifier</label>
                            </div>
                            <div className="col-auto">
                                <input type="text" id="identifier" className="form-control" required ref={identifier}/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="weight" className="col-form-label">Height</label>
                            </div>
                            <div className="col-auto">
                                <input type="number" id="weight" className="form-control" required ref={weight}/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="height" className="col-form-label">Weight</label>
                            </div>
                            <div className="col-auto">
                                <input type="number" id="height" className="form-control" required ref={height}/>
                            </div>
                            <div className="col-auto">
                               <button type='submit' className='btn btn-success'>Submit</button>
                            </div>
                            </div>
                        </form>
                    </>
                )
            }
            <button onClick={toggleEdit} className={`btn ${editting ? 'btn-danger' : 'btn-primary'}`}>{editting ? 'Cancel' : 'Edit'}</button>
        </div>
        </div>
    </div>
  )
}

export default Show