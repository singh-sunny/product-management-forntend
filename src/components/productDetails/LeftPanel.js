import {Button, ButtonTypes} from '../button';
import {LocStrings} from '../../i18n/i18n';
import {getCombinations, getVarientName} from './productUtil';

const LeftPanel = (props) => {
    if(props.currentVarients.length === 1 && getVarientName(props.currentVarients[0]).length === 0) {
        return (
            <div className= {"content"}>
                <div className="add-varient-btn-wrapper">
                    <Button 
                        klass="add-varient-btn"
                        btnType={ButtonTypes.STANDARD_BUTTON}
                        buttonLabel={LocStrings.addVarients}
                        onClick={props.addEditVarientButtonClick}
                    />
                </div>
            </div>
        );
    }
    else {
        return (
            <div className= {"content multiple-varient" }>
                <VarientNamesList 
                    combinations={props.currentVarients} 
                    validationErrors={props.validationErrors}
                    setSelectedVarient={props.setSelectedVarient}
                    selectedVarient={props.selectedVarient}
                />
                <Button 
                    klass="edit-varient-btn"
                    btnType={ButtonTypes.STANDARD_BUTTON}
                    buttonLabel={LocStrings.editVarients}
                    onClick={props.addEditVarientButtonClick}
                />
            </div>
        );
    }
};

const VarientNamesList = (props) => {
    const validationErrors = props.validationErrors;

    const varientOnClick = (e) => {
        props.setSelectedVarient(e.currentTarget.getAttribute('id'));
    }
    
    return (
        <ul>
            {props.combinations.map((v) => {
                const name = getVarientName(v);

                return (
                    <li key={v._id} id={v._id} onClick={varientOnClick} className={v._id === props.selectedVarient ? 'selected': ''}>
                        <span>{name}</span>
                        {validationErrors[v._id] ? (<span className="error-indicator">{`Please fill details`}</span>) : null}
                    </li>
                )
            })}
        </ul>
    );
};

export {LeftPanel};