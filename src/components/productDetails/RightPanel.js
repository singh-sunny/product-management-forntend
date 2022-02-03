import {pickCurrentVarients} from './productUtil';
import {Varient} from './Varient';
import {FAQDetails} from './FAQDetails';

const RightPanel = (props) => {
    const varients = pickCurrentVarients(props.currentVarients, props.allVarients);

    return (
        <>
            {varients.map((v) => { return (<Varient key={v._id} varient={v} {...props} />) })}
            <FAQDetails {...props} />
        </>
    )
}

export {RightPanel};