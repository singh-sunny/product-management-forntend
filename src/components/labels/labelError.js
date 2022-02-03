const Label_Error = (props) => {

    const klass = props.className ? `error ${props.className}` : 'error';

    return (
        <label className={klass}>{props.text}</label>
    );
}

export { Label_Error };