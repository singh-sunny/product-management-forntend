import './textInput.scss';

const Input = (props) => {
    if(!props.hasLabel) {
        return (
            <input value={props.value} onChange={props.onChange} className="input-text" type="text" placeholder={props.placeholder} />
        )
    }
    else {
        return(
            <div className="wrapper">
                <label className="field-label">{props.labelText}</label>
                <input value={props.value} onChange={props.onChange} className="input-text with-label" type="text" placeholder={props.placeholder}/>
            </div>
        )
    }
}

export { Input }