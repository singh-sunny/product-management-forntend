import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {LocStrings} from '../../i18n/i18n';

import './navbar.scss';

const Nav = (props) => {
    return (
            <nav className="nav">
                <div className="nav-sections fixed-control">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <div className="page-title">{props.pageTitle}</div>
                </div>
                <div className="nav-sections page-control">
                    {props.pageControls}

                    {
                        props.showValidationError ? 
                        <div className="input-error">{LocStrings.invalidInput}</div> :
                        null
                    }  
                    
                </div>
            </nav>
    );
};

export default Nav;