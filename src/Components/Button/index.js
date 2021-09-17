import './style.css'
import { GoSearch } from "react-icons/go";

function Button({onClick}) {
    return <button onClick = {onClick}><GoSearch /></button>
}

export default Button;