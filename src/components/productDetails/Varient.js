import {useRef} from 'react';
import {TextDetails} from './TextDetails';
import {MediaDetails} from './MediaDetails';

const Varient = (props) => {

    const textDetailsInputRef = useRef({});
    const mediaInputRef = useRef({});

    props.getUserInputRef.current[props.varient._id] = {getUserInput: () => {
        const output = {
            productDetail: textDetailsInputRef.current.getUserInput(),
            media: mediaInputRef.current.getUserInput()
        };
        return output;
    }};
    
    return (
        <div className={(props.selectedVarient === props.varient._id) ? '': 'hide'}>
            <TextDetails {...props} getUserInputRef={textDetailsInputRef} />
            <MediaDetails {...props} getUserInputRef={mediaInputRef} />
        </div>
    );
}

export { Varient };








































// import {useRef} from 'react';
// import {TextDetails} from './TextDetails';
// import {MediaDetails} from './MediaDetails';

// const Varient = (props) => {
//     const textDetailsInputRef = useRef({});
//     const mediaInputRef = useRef({});

//     props.getUserInputRef.current[props.id] = {};
    
//     props.getUserInputRef.current[props.id].getUserInput = () => {
//         const {error:textDetailsError, productDetails:textDetailInput} = textDetailsInputRef.current.getUserInput();
//         const {error:mediaError, created, deleted} = mediaInputRef.current.getUserInput();

//         if(textDetailsError.length || mediaError.length) {
//             return {error: [...textDetailsError, ...mediaError]}
//         }

//         return {productDetails: textDetailInput, media: {created: created, deleted: deleted}}
//     }

//     return (
//         <div className={!props.isSelelcted ? 'hide': ''}>
//             <TextDetails {...props} getUserInputRef={textDetailsInputRef} />
//             <MediaDetails {...props} getUserInputRef={mediaInputRef} />
//         </div>
//     );
// }

// export { Varient };



