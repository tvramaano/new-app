import './button.css'

function Button(props){
    return(
            <button
                className='button-container'
                onClick={props.handleOnclick}
            >
                {props.buttonName}
            </button>
    ) 
}

export default Button;