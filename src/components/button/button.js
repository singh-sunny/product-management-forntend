import './button.scss';
import ButtonStandard from './ButtonStandard';
import ButtonSmall from './ButtonSmall';


const Button = (props) => {
    let button = null

    switch(props.btnType) {
        case 'standard-button': 
            button = <ButtonStandard {...props} />
            break;
        case 'btn-small': 
            button = <ButtonSmall {...props} />
        break;
        default:
            console.error(`${props.btnType} button is not implemented`);
    }

    return button;
}

export {Button};