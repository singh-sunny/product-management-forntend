

const ButtonSmall = (props) => {
    const klass = props.klass ?  `btn btn-small ${props.klass}` : `btn btn-small`;

    return (
        <button type="button" className="btn btn-small" onClick={props.onClick}>
            {props.buttonLabel}
        </button>
    )
}

export default ButtonSmall;