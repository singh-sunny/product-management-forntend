const Label_Warn = (props) => {

    const klass = props.className ? `warn ${props.className}` : 'warn';

    return (
        <label className={klass}>{props.text}</label>
    );
}

export { Label_Warn };