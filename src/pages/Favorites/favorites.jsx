import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favorites.styles.css';

function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const list = localStorage.getItem('@primeflix');
        setMovies(JSON.parse(list) || []);
    }, []);

    function handleErase(id) {
        let filterMovie = movies.filter((item) => {
            return (item.id !== id)
        })
        setMovies(filterMovie);
        localStorage.setItem('@primeflix', JSON.stringify(filterMovie))
        toast.success('Filme removido!')
    }

    return (
        <div className="container-fav">
            <div className='favorites-movies'>
                <h1>Minha<span className='span-title'> Lista</span></h1>
                {movies.length === 0 && <span className='not-save' >Você ainda não tem nenhum filme salvo :( </span>}
                <ul>
                    {movies.map((m) => {
                        return (
                            <li key={m.id}>
                                <div className="info">
                                    <span>{m.title}</span>
                                    <img src={`https://image.tmdb.org/t/p/original/${m.backdrop_path}`} alt={m.title} />
                                </div>
                                <div className='area-btn'>
                                    <Link to={`/movie/${m.id}`}>Informações</Link>
                                    <button onClick={() => handleErase(m.id)}>Remover</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Favorites;