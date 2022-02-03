import {Button, ButtonTypes} from '../../../components/button';
import {LocStrings} from '../../../i18n/i18n';

const buttonTitle = LocStrings.save;

const navControls = (clickHandler) => {
    return (<Button 
                btnType={ButtonTypes.STANDARD_BUTTON}
                buttonLabel={buttonTitle}
                onClick={clickHandler}
            />);
};

export { navControls };