import './textInput.scss';

const Textarea = (props) => {
    if(!props.hasLabel) {
        return (
            <div className="wrapper">
                {!props.value.length  ? 
                        <span className="placeholder">{props.placeholder}
                            {props.isRequired ? <span className="reqired-field"> *</span> : null}
                        </span>
                    : null}
                <textarea value={props.value} onChange={props.onChange} className={"input-textarea"+ (props.showInvalid && !props.value.length ? " invalid" : "")} />
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
                <textarea value={props.value} onChange={props.onChange} className={"input-textarea with-label"+ (props.showInvalid && !props.value.length ? " invalid" : "")} />
            </div>
        )
    }
}

export {Textarea}