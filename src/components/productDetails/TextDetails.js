import {useState} from 'react';
import {Input, Textarea } from '../textInput';
import Switch from "react-switch";
import {LocStrings} from '../../i18n/i18n';

const TextDetails = (props) => {
    const isCreateFlow = props.isCreateFlow;
    const varient =  props.varient;

    const [skuID, setSKUId] = useState(isCreateFlow ? '' : varient.skuID.toString());
    const [produtTitle, setprodutTitle] = useState(isCreateFlow ? '' : varient.productTitle.toString());
    const [productDescription, setproductDescription] = useState(isCreateFlow ? '' : varient.productDescription.toString());
    const [discountedPrice, setdiscountedPrice] = useState(isCreateFlow ? '' : varient.dicountedListPrice.toString());
    const [EANCode, setEANCode] = useState(isCreateFlow ? '' : varient.EANCode.toString());
    const [taxPercentage, settaxPercentage] = useState(isCreateFlow ? '' : varient.taxPercentage.toString());
    const [listPrice, setlistPrice] = useState(isCreateFlow ? '' : varient.listPrice.toString());
    const [HSNCode, setHSNCode] = useState(isCreateFlow ? '' : varient.HSNCode.toString());
    const [isActive, setIsActive] = useState(isCreateFlow ? true : varient.isActive);
    const [isSubmit, setIsSubmit] = useState(false);

    const SKUIdOnChange = (e) => {setSKUId(e.target.value)};
    const produtTitleOnChange = (e) => {setprodutTitle(e.target.value)};
    const productOnChange = (e) => {setproductDescription(e.target.value)};
    const discountedOnChange = (e) => {setdiscountedPrice(e.target.value)};
    const EANChange = (e) => {setEANCode(e.target.value)};
    const taxPercentageOnChange = (e) => {settaxPercentage(e.target.value)};
    const listPricedOnChange = (e) => {setlistPrice(e.target.value)};
    const HSNCodeOnChange = (e) => {setHSNCode(e.target.value)};

    props.getUserInputRef.current.getUserInput = () => {
        const input = {};
        const error = [];

        const states = [
            {state: skuID, label: 'skuID', schemaKey: 'skuID'},
            {state: produtTitle, label: 'Product title', schemaKey: 'productTitle'},
            {state: productDescription, label: 'Product description', schemaKey: 'productDescription'},
            {state: discountedPrice, label: 'Discounted price', schemaKey: 'dicountedListPrice'},
            {state: listPrice, label: 'List Price', schemaKey: 'listPrice'},
            {state: EANCode, label: 'EAN Code', schemaKey: 'EANCode'},
            {state: HSNCode, label: 'HSN Code', schemaKey: 'HSNCode'},
            {state: taxPercentage, label: 'Tax Percentage', schemaKey: 'taxPercentage'},
        ];

        states.forEach((s) => {
            if(!s.state.trim().length) {
                error.push(`Please fill ${s.label}`);
            }

            input[s.schemaKey] = s.state;
        });

        input['isActive'] = isActive;
        input.color = varient.color;
        input.size = varient.size;

        setIsSubmit(true);

        return {error: error, productDetails: input};
    }
    
    return(
        <div className="section text-section">
            <div className="header-row">
                <h2 className="text-section-header">{LocStrings.productDetails}</h2>
                <div className="product-active-status">
                    <Switch uncheckedIcon={false} checkedIcon={false} checked={isActive} onChange={(checked, event, id) => {setIsActive(checked)}}  />
                    <span>
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                
            </div>
            <Input showInvalid={isSubmit} isRequired={true} value={skuID} onChange={SKUIdOnChange} placeholder={LocStrings.SKUID} hasLabel={true} labelText={LocStrings.SKUID} />
            <Input showInvalid={isSubmit} isRequired={true} value={produtTitle} onChange={produtTitleOnChange} placeholder={LocStrings.produtTitle} hasLabel={true} labelText={LocStrings.produtTitle} />
            <Textarea showInvalid={isSubmit} isRequired={true} value={productDescription} onChange={productOnChange} placeholder={LocStrings.productDescription} hasLabel={true} labelText={LocStrings.productDescription} />
            
            <div className="two-col-container">
                <div className="col-left">
                    <Input showInvalid={isSubmit} isRequired={true} value={discountedPrice} onChange={discountedOnChange} placeholder={LocStrings.discountedPrice} hasLabel={false}  />
                    <Input showInvalid={isSubmit} value={EANCode} onChange={EANChange} placeholder={LocStrings.EANCode} hasLabel={true} labelText={LocStrings.EANCode} />
                    <Input showInvalid={isSubmit} value={taxPercentage} onChange={taxPercentageOnChange} placeholder={LocStrings.taxPercentage} hasLabel={false}  />
                </div>
                <div className="col-right">
                    <Input showInvalid={isSubmit} isRequired={true} value={listPrice} onChange={listPricedOnChange} placeholder={LocStrings.listPrice} hasLabel={false}  />
                    <Input showInvalid={isSubmit} isRequired={true} value={HSNCode} onChange={HSNCodeOnChange} placeholder={LocStrings.HSNCode} hasLabel={true} labelText={LocStrings.HSNCode} />
                </div>
            </div>
        </div> 
    );
};

export { TextDetails };