// format props decides the layout and style or header

const ListeHeader = (props) => {
    if(props.design === 'HomePage') { //choose better codes
        return (<ListHeader_HOMEPAGE {...props} />)
    }
}

const ListHeader_HOMEPAGE = (props) => {
    return (
        <div className="list-header">
            {
                props.headers && props.headers.length &&  
                    (props.headers.map((item, index) => {
                        return (<ListeHeaderItem key={index} item={item} />)
                    })) 
            }
        </div>
    );
}

const ListeHeaderItem = (props) => {
    return (
        <div>
            {props.item}
        </div>
    );
}


export { ListeHeader };