import './favoritos.css'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function Favoritos() {

    const [filme, setFilme] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem('@skrflix');
        setFilme(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id) {
        let filtroFilmes = filme.filter((item) => {
            return (item.id !== id)
        })

        setFilme(filtroFilmes);
        localStorage.setItem('@skrflix', JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso! ')
    }

    return (
        <div className='meusFilmes'>
            <h1>Meus Filmes</h1>

            {filme.length === 0  && <span>Você não tem nenhum filme salvo :(</span>}

            <ul>
                {filme.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link className='detalhes' to={`/filme/${item.id}`}> DETALHES</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Favoritos;