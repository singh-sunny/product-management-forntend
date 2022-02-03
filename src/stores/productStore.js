import {fetchProducts, postProduct, patchProduct} from '../services/productServices'; 

const getProducts = (params) => {
    return fetchProducts(params)
    .then((res) => {
        return res;
    });
}

const createProduct = (input) => {
    return postProduct(input)
    .then((res) => {
        console.log(res)
        return res;
    });
}

const updateProduct = (input, id) => {
    return patchProduct(input, id)
    .then((res) => {
        console.log(res)
        return res;
    });
}

export {getProducts, createProduct, updateProduct}