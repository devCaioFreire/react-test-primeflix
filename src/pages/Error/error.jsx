import './error.styles.css';
import error from '../../assets/error1.gif'

function Error() {
    return (
        <div className='not-found'>
            <img className='imgError' src={error}></img>
        </div>
    )
}

export default Error;