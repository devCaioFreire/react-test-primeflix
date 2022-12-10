import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.styles.css';
import ImgLoading from '../../assets/loading.gif'

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMovies() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "227cde4d3046bf4d3aa442494a6ab600",
                    language: "pt-BR",
                    page: 1,
                }
            })

            // console.log(response.data.results.slice(0, 10));
            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadMovies();

    }, [])

    if (loading) {
        return (
            <div className='loading'>
                <img src={ImgLoading} height={350} ></img>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className="list-movies">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link className='btn' to={`/movie/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div >
    )
}

export default Home;