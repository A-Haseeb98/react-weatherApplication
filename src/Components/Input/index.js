import './style.css'
import { GoSearch } from "react-icons/go";

function Body() {
    return (
        <div className='container'>
            <input type='text' placeholder='Search Location' />
            <button><GoSearch /></button>

        </div>
    )
}

export default Body;