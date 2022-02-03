import {LABEL_TYPES} from './labelTypes';
import {Label_Success, Label_Warn, Label_Error} from './helper';

import './label.scss';

const Label = (props) => {
    if(props.type === LABEL_TYPES.SUCCESS) {
        return (<Label_Success {...props} />);
    }
    else if(props.type === LABEL_TYPES.WARN) {
        return (<Label_Warn {...props} />);
    }
    else if(props.type === LABEL_TYPES.ERROR) {
        return (<Label_Error {...props} />);
    }
};

export {Label}