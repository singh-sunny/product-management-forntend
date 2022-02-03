// format props decides the layout and style or header

const List = (props) => {
    if(props.design === 'HomePage') { //choose better codes
        return (<List_HOMEPAGE {...props} />)
    }
}

const List_HOMEPAGE = (props) => {
    return (
        <ul className="list-wrapper">
            {props.itemsRender({className: 'list-item'})}
        </ul>
    );
}

export { List };