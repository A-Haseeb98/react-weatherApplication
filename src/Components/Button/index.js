import './style.css'

function Button({ onclick, children }) {
    return (
        <div>
            <button onClick={onclick}>{children}</button>
        </div>
    )
}
export default Button;