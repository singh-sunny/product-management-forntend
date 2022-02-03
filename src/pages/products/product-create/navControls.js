import {Button, ButtonTypes} from '../../../components/button';

const buttonTitle = "+ Add Products";

const navControls = (clickHandler) => {
    return (<Button 
                btnType={ButtonTypes.STANDARD_BUTTON}
                buttonLabel={buttonTitle}
                onClick={clickHandler}
            />);
};

export { navControls };