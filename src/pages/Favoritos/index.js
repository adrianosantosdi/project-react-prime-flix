import React, {useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'

const Favoritos = () => {
    const [filmes, setFimes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem('@primeflix')
        setFimes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFimes(filtroFilmes)
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenum filme salvo :( </span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{ item.title }</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos