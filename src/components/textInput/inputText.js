import './textInput.scss';

const Input = (props) => {

    if(!props.hasLabel) {
        return (
            <div className="wrapper">
                {!props.value.length  ? 
                        <span className="placeholder">{props.placeholder}
                            {props.isRequired ? <span className="reqired-field"> *</span> : null}
                        </span>
                    : null}
                <input value={props.value} onChange={props.onChange} className={"input-text" + (props.showInvalid && !props.value.length ? " invalid" : "")} type="text" />
            </div>
        )
    }
    else {
        return(
            <div className="wrapper">
                <label className="field-label">{props.labelText}</label>
                {!props.value.length  ? 
                        <span className="placeholder">{props.placeholder}
                            {props.isRequired ? <span className="reqired-field"> *</span> : null}
                        </span>
                    : null}
                <input value={props.value} onChange={props.onChange} className={"input-text with-label" + (props.showInvalid && !props.value.length ? " invalid" : "")} type="text"  />
            </div>
        )
    }
}

export { Input }