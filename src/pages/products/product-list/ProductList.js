import React, {useState, useEffect} from 'react';

//components
import Nav from '../../../components/navbar';
import {Spinner} from '../../../components/spinner';
import {ScrollableTable, ListDesigns} from '../../../components/scrollableTable';

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
    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 2000);

    useEffect(async () => {
        const params = debouncedSearchTerm.trim().length ? `?skuID=${debouncedSearchTerm}&productTitle=${debouncedSearchTerm}` : ''
        setIsLoading(true);
        const productList = await getProducts(params);
        setProducts(productList);
        setIsLoading(false);
    }, [debouncedSearchTerm]);

    const tableClickHandler = (e) => {
        if(e.target.classList.contains('product')) {
            e.preventDefault();
            const productID = e.target.getAttribute('id')
            props.navigateTo(props.APP_PAGES.ProductEdit, {id: productID});
        }
    }
    
    return (
        <React.Fragment>
            <Nav 
                pageTitle={LocStrings.homePageTitle}
                pageControls={navControls(clickHandler)}
            />
            <div className="page">
                {
                    isLoading ? <Spinner /> :
                    (
                        <>
                            <input 
                                type="text" 
                                value={searchText}
                                className="search-box"
                                onChange={(e) => { setSearchText(e.target.value) }} 
                                placeholder={LocStrings.productSearchInputBoxPlaceHolder} 
                            />
                            <div className="tableWrapper" onClick={(e) => {tableClickHandler(e)}}>
                                <ScrollableTable 
                                    headers={productListHeader}
                                    itemsRender={productListItem(products)}
                                    infiniteLoad={true}
                                    design={ListDesigns.HomePage}
                                />
                            </div>
                            
                        </>
                    )
                }
            </div>
        </React.Fragment>
    );
};

export default ProductList;