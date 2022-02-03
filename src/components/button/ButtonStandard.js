

const ButtonStandard = (props) => {

    const klass = props.klass ?  `standard-button ${props.klass}` : `standard-button`;

    return (
        <button type="button" className={klass} onClick={props.onClick}>
            {props.buttonLabel}
        </button>
    )
}

export default ButtonStandard;