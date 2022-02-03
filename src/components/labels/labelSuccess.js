const Label_Success = (props) => {

    const klass = props.className ? `success ${props.className}` : 'success';

    return (
        <label className={klass}>{props.text}</label>
    );
}

export { Label_Success };