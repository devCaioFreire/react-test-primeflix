import { Link } from 'react-router-dom';
import './header.styles.css';

function Header() {
    return(
        <header>
            <Link className='logo' to={'/'}>Prime<span>Flix</span></Link>
            <Link className='favoritos' to={'/favorites'}>Favoritos</Link>
        </header>
    )
}

export default Header;