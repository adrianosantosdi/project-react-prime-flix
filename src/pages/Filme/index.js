import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import api from "../../services/api";
import './filme-info.css'

const Filme = () => {
    const { id } = useParams()
    const navigation = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '28fc232cc001c31e8a031f419d0a14ca',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigation('/', { replace: true })
                return
            })
        }

        loadFilme()

        return () => {

        }

    }, [navigation, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix')
        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilmes = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilmes) {
            alert('ESSE FILME JÁ ESTA NA LISTA')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        alert('FILME SALVO COM SUCESSO')
    }

    if(loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{ filme.title }</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path }`} alt={ filme.title } />
            <h3>Sinopse</h3>
            <span>{ filme.overview }</span>

            <strong>Avaliação { filme.vote_average }/ 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_black" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme