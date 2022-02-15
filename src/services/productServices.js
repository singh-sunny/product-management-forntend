import {config} from '../config';


const url = config.serviceBaseURL + 'products';

const fetchProducts = (params) => {
    let uri = url;

    if(params) {
        uri = uri + `/${params}`;
    }
    
    
    

    return fetch(uri)
    .then((res) => {
        if(!res.ok) {
            throw (res);
        }
        
        return res.json();
    })
};

const postProduct = (input) => {
    return fetch(url, {
        body: input,
        method: 'POST'
    })
    .then((res) => {
        if(!res.ok) {
            throw (res);
        }
        
        return res.json();
    })
} 

const patchProduct = (input, id) => {
    const uri = url + `/${id}`;

    return fetch(uri, {
        body: input,
        method: 'PATCH'
    })
    .then((res) => {
        if(!res.ok) {
            throw (res);
        }
        
        return res.json();
    })
}

export {fetchProducts, postProduct, patchProduct};