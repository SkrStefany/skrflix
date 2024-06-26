import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import { toast, ToastContainer } from 'react-toastify';

import api from '../services/api'

function Filme() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch((response)=>{
                navigate('/', {replace: true});
                return;
                
            })
            
        }
        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem('@skrflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasfilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id )

        if(hasfilme) {
            toast.warn('Esse filme já está na lista');
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@skrflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso')

    }

    if(loading){
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes... </h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
             <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buton'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='_blank'  rel='noreferrer'  href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> Trailer</a>
                </button>

            </div>
        </div>
    );
}

export default Filme;