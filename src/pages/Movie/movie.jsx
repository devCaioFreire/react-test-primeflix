import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api'
import './movie.syles.css';
import ImgLoading from '../../assets/loading.gif'
import { toast } from 'react-toastify'

function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMovie() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "227cde4d3046bf4d3aa442494a6ab600",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setMovie(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.warn('FILME NÃO ENCONTRADO!');
                    navigate('/', { replace: true });
                    return;
                })
        };
        loadMovie();

    }, []);

    function saveMovie() {
        const list = localStorage.getItem('@primeflix');
        let movieSaved = JSON.parse(list) || [];
        const hasMovie = movieSaved.some((movieSaved) => movieSaved.id === movie.id);

        if (hasMovie) {
            toast.warn('O filme selecionado já está salvo na sua lista!')
            return;
        }
        movieSaved.push(movie)
        localStorage.setItem('@primeflix', JSON.stringify(movieSaved));
        toast.success('Filme salvo com sucesso!')
    }

    if (loading) {
        return (
            <div className='loading'>
                <img src={ImgLoading} height={350} ></img>
            </div>
        )
    }

    return (
        <div className="wrap-movie">
            <div className="container-movie">
                <h1>{movie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                <h3>Sinopse</h3>
                <p>{movie.overview}</p>
                <strong>Avaliação: <span>{movie.vote_average.toFixed(1)} | 10</span></strong>
                <div className="area-btn">
                    <button onClick={saveMovie}>Salvar</button>
                    <button>
                        <a target={'blank'} rel='external' href={`http://youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</a>
                    </button>
                    <button><Link to={'/'}>Voltar</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Movie;