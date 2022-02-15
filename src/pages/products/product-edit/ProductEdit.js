import React, {useState, useEffect, useRef} from 'react';

//components
import Nav from '../../../components/navbar';
import {Spinner} from '../../../components/spinner';
import {Product} from '../../../components/productDetails';
import {FullScreenSpinner} from '../../../components/spinner';

//store
import {getProducts, updateProduct} from '../../../stores/productStore';

//Helpers
import { navControls } from './helper';

//localized strings
import {LocStrings} from '../../../i18n/i18n';

//styles
import './products.scss';


const ProductEdit = (props) => {
    
    const [productDetails, setProducDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showValidationError, setShowValidationError] = useState(false)
    const [validationErrors, setValidationErrors] = useState(false);
    const userInput = useRef({});
    const timerID = useRef(null);
    const currentAndDeletedVarientsRef = useRef({});
    const [showFullScreenSpinner, setShowFullScreenSpinner] = useState(false);
    
    

    useEffect(async () => {
        setIsLoading(true);
        const product =  await getProducts(props.id);
        setProducDetails(product);
        setIsLoading(false);
    }, [props.id]);

    const saveButtonClick = () => {
        const output = {};
        const invalidVarients = {}
        let isInvalid = false;
        let {currentVarients, deletedVarients} = currentAndDeletedVarientsRef.current.getCurrentAndDeletedVarients();

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

        submitProduct(output, userInput.current.faq.getUserInput(), deletedVarients, props.id, props.setNotification, props.navigateTo, props.APP_PAGES, setShowFullScreenSpinner);
        
     };

    return (
        <React.Fragment>
             <Nav 
                pageTitle={LocStrings.editProductPageTitle}
                pageControls={navControls(saveButtonClick)}
                showValidationError={showValidationError}
                onBackClick={() => {
                    props.navigateTo(props.APP_PAGES.ProductList) 
                }}
            />
            
            {
                isLoading ?
                <Spinner /> : 
                <>
                <div className="page product-edit" style={{backgroundColor: '#FFFFFF'}}>
                    <Product 
                        product={productDetails} 
                        getUserInputRef={userInput}
                        validationErrors = {validationErrors}
                        currentAndDeletedVarientsRef={currentAndDeletedVarientsRef}
                        selectedSKUID={props.selectedSKUID}
                    />
                </div>
                {showFullScreenSpinner ? <FullScreenSpinner /> : null}
                </>
            }
        </React.Fragment>
    );
};


const submitProduct = (input, faq, deletedVarient, id, setNotification, navigateTo, APP_PAGES, setShowFullScreenSpinner) => {
    const reqInput = {varients: {}, faq: {}};
    let deleteMediaForUpdatedVarients = [];
    let deleteMediaForDeletedVarients = [];
    let addMediaForUpdatedVarients = [];

    if(faq.created.length) {
        reqInput.faq.create = faq.created;
    }
    if(faq.updated.length) {
        reqInput.faq.update = faq.updated;
    }
    if(faq.deleted.length) {
        reqInput.faq.delete = faq.deleted;
    }

    const formData = new FormData()

    if(deletedVarient.length) {
        reqInput.varients.delete = deletedVarient.map((v) => { return v._id })
        deleteMediaForDeletedVarients = (deletedVarient.map((v) => { return v.media.map((m) => {return m.path}) })).flat();
    }

    Object.keys(input).forEach((k) => {
        if(/__NEW__/.test(k)) {
            reqInput.varients.create = !reqInput.varients.create ? [] : reqInput.varients.create;
            reqInput.varients.create.push(input[k].productDetail.productDetails);
            input[k].media.created.forEach((m) => {
                formData.append(`${input[k].productDetail.productDetails.skuID}[]`, m)
            })
        }
        else {
            reqInput.varients.update = !reqInput.varients.update ? [] : reqInput.varients.update;

            reqInput.varients.update.push({...input[k].productDetail.productDetails, _id: k});

            input[k].media.created.forEach((m) => {
                formData.append(`${input[k].productDetail.productDetails.skuID}[]`, m);
                addMediaForUpdatedVarients.push(input[k].productDetail.productDetails.skuID)
            })
            input[k].media.deleted.forEach((m) => {
                deleteMediaForUpdatedVarients.push(m)
            })
        }
        
    })

    if(deleteMediaForDeletedVarients.length) {
        reqInput.varients.deleteMediaForDeletedVarients = deleteMediaForDeletedVarients;
    }

    if(deleteMediaForUpdatedVarients.length) {
        reqInput.varients.deleteMediaForUpdatedVarients = deleteMediaForUpdatedVarients;
    }

    if(addMediaForUpdatedVarients.length) {
        reqInput.varients.addMediaForUpdatedVarients = addMediaForUpdatedVarients;
    }

    setShowFullScreenSpinner(true);
    formData.append('productDetails', JSON.stringify(reqInput))

    updateProduct(formData, id)
    .then(() => {
        setShowFullScreenSpinner(false);
        setNotification('success: Product edited successfully') // do better

        setTimeout(() => {
            setNotification(false);
            //navigateTo(APP_PAGES.ProductList);
            window.location.reload();
        }, 3000)
    })
    .catch((e) => {
        setShowFullScreenSpinner(false);
        setNotification('error: Something went wrong') // do better

        setTimeout(() => {
            setNotification(false);
        }, 3000)
    })
}

export default ProductEdit;

