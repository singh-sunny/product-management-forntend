import './textInput.scss';

const Textarea = (props) => {
    if(!props.hasLabel) {
        return (
            <textarea value={props.value} onChange={props.onChange} className="input-textarea" placeholder={props.placeholder}/>
        )
    }
    else {
        return(
            <div className="wrapper">
                <label className="field-label">{props.labelText}</label>
                <textarea value={props.value} onChange={props.onChange} className="input-textarea with-label" placeholder={props.placeholder} />
            </div>
        )
    }
}

export {Textarea}