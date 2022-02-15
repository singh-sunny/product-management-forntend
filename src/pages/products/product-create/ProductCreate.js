import React, {useState, useEffect, useRef} from 'react';

//components
import Nav from '../../../components/navbar';
import {Product} from '../../../components/productDetails';
import {FullScreenSpinner} from '../../../components/spinner';

//store
import {createProduct} from '../../../stores/productStore';

//Helpers
import { navControls } from './helper';

//localized strings
import {LocStrings} from '../../../i18n/i18n';

//styles
import './products.scss';


const ProductCreate = (props) => {
    const [showValidationError, setShowValidationError] = useState(false);
    const [validationErrors, setValidationErrors] = useState(false)
    const [showFullScreenSpinner, setShowFullScreenSpinner] = useState(false)
    const userInput = useRef({});
    const timerID = useRef(null);
    const currentVarientsRef = useRef({});


    const saveButtonClick = () => {
        const output = {};
        const invalidVarients = {}
        let isInvalid = false;
        let currentVarients = currentVarientsRef.current.getCurrentVarients();

        currentVarients = currentVarients.map((v) => {return v._id;})

        currentVarients.forEach((id) => {
            output[id] = userInput.current[id].getUserInput();

            if((output[id]['media']['error'] && output[id]['media']['error'].length) || (output[id]['productDetail']['error'] && output[id]['productDetail']['error'].length)) {
                isInvalid = true;
                invalidVarients[id] = [...output[id]['media']['error'], ...output[id]['productDetail']['error']]
            }
        });

        if(isInvalid) {
            setShowValidationError(true);
            setValidationErrors(invalidVarients)

            clearTimeout(timerID);
            timerID.current  = setTimeout(() => { setShowValidationError(false);}, 5000);

            return;
        }

         
        submitProduct(output, userInput.current.faq.getUserInput(), props.setNotification, props.navigateTo, props.APP_PAGES, setShowFullScreenSpinner);
        
     };

    return (
        <React.Fragment>
             <Nav 
                pageTitle={LocStrings.addProduct}
                pageControls={navControls(saveButtonClick)}
                showValidationError={showValidationError}
                onBackClick={() => { props.navigateTo(props.APP_PAGES.ProductList) }}
            />
            
            <div className="page product-create"  style={{backgroundColor: '#FFFFFF'}}>
                <Product isCreateFlow={true} currentVarientsRef={currentVarientsRef}  getUserInputRef={userInput} validationErrors = {validationErrors}/>
            </div>
            {showFullScreenSpinner ? <FullScreenSpinner /> : null}
        </React.Fragment>
    );
};

const submitProduct = (input, faq, setNotification, navigateTo, APP_PAGES, setShowFullScreenSpinner) => {
    const f = new FormData();

    const userData = {varients: [], faq: faq.created}
    const data = [];
    
    const productDetails = Object.keys(input).forEach((v) => {
        userData.varients.push(input[v].productDetail.productDetails);

        input[v].media.created.forEach((file) => {
            f.append(`${input[v].productDetail.productDetails.skuID}[]`, file);
        })
    });


    f.append('productDetails', JSON.stringify(userData));


    setShowFullScreenSpinner(true);
    createProduct(f)
    .then(() => {
        setShowFullScreenSpinner(false);
        setNotification('success: Product created successfully') // do better
        setTimeout(() => {
            setNotification(false)
            //navigateTo(APP_PAGES.ProductList);
            window.location.reload();
        }, 3000)
    })
    .catch((e) => {
        setShowFullScreenSpinner(false);
        setNotification('error: Something went wrong') // do better
        setTimeout(() => {
            setNotification(false)
        }, 3000)
    })
}

export default ProductCreate;

