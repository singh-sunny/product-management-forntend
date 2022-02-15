import React, {useState, useEffect} from 'react';

//components
import Nav from '../../../components/navbar';
import {Spinner} from '../../../components/spinner';
import {ScrollableTable, ListDesigns} from '../../../components/scrollableTable';
import {Button, ButtonTypes} from '../../../components/button';

//utils
import {useDebounce} from '../../../utils/customHooks';

//store
import {getProducts} from '../../../stores/productStore';

//Helpers
import { productListItem, productListHeader, navControls } from './helper';

//styles
import './productList.scss';

//localized strings
import {LocStrings} from '../../../i18n/i18n';


const ProductList = (props) => {
    const clickHandler = () => { props.navigateTo(props.APP_PAGES.ProductCreate); };

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 500);

    const loadData = async () => {
        const text = debouncedSearchTerm.trim();
        let query = '';

        let maxSkuID = -1;
        if(text) {
            query = `?skuID=${debouncedSearchTerm}&productTitle=${debouncedSearchTerm}&filter=true&maxSkuID=${maxSkuID}`;
        }
        else {
            query = `?maxSkuID=${maxSkuID}&list=true`;
        }

        setIsLoading(true);
        try {
            const productList = await getProducts(query);
            setProducts(productList);
            setIsLoading(false);
        }
        catch(e) {
            setIsLoading(false);
            setIsError(true);
        }
    }

    const loadMore = async () => {
        const text = debouncedSearchTerm.trim();
        let query = '';

        let skuID = products.length ? products[products.length - 1]['varients']['skuID'] : -1;

        if(text) {
            query = `?skuID=${debouncedSearchTerm}&productTitle=${debouncedSearchTerm}&filter=true&maxSkuID=${skuID}`;
        }
        else {
            query = `?maxSkuID=${skuID}&list=true`;
        }

        setIsLoading(true);
        try {
            const productList = await getProducts(query);
            setProducts((prev) => {
                return ([...prev, ...productList]);
            });
            setIsLoading(false);
        }
        catch(e) {
            setIsLoading(false);
            setIsError(true);
            
        }
    }

    useEffect(loadData, [debouncedSearchTerm]);

    const productClickHandler = (id, selectedSKUID) => {
        props.navigateTo(props.APP_PAGES.ProductEdit, {id: id, selectedSKUID: selectedSKUID});
    }
    
    return (
        <React.Fragment>
            <Nav 
                pageTitle={LocStrings.homePageTitle}
                pageControls={navControls(clickHandler)}
            />
            {
                
                (
                    <>
                        {
                            isError ? (<div className="page-load-error-message">{LocStrings.pageLoadError}</div>)
                            :
                            <div className="page product-list">
                                <div className="search-load-controls">
                                    <input 
                                        type="text" 
                                        value={searchText}
                                        className="search-box"
                                        onChange={(e) => { setSearchText(e.target.value) }} 
                                        placeholder={LocStrings.productSearchInputBoxPlaceHolder} 
                                    />
                                    {isLoading ? <Spinner /> : null}
                                    <Button 
                                        btnType={ButtonTypes.SMALL_BUTTON}
                                        buttonLabel={'Load More'}
                                        onClick={loadMore}
                                    />
                                </div>
                                
                                <div className="tableWrapper">
                                    <ScrollableTable 
                                        headers={productListHeader}
                                        itemsRender={productListItem(products, productClickHandler)}
                                        infiniteLoad={true}
                                        design={ListDesigns.HomePage}
                                        list={products}
                                        listItemClickHandler={productClickHandler}
                                    />
                                </div>
                            </div>
                        }
                    </>
                )
            }
        </React.Fragment>
    );
};

export default ProductList;