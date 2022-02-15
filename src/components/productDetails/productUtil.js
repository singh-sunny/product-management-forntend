import { v4 as uuidv4 } from 'uuid';

const getCombinations = (varientList) => {
    return (varientList.map((v) => {
        return {color: v.color, size: v.size, label: getVarientName(v), _id: v._id}
    }));
};

const getVarientName = (v) => {
    let name = '';
    
    name = v.color ? v.color + '-' : name;
    name = v.size ? name + v.size + '-' : name;

    return (name.slice(0, name.length - 1));
};

const pickCurrentVarients = (curentVarients, allVarients) => {
    const ids = curentVarients.map((v) => { return v._id; })
    const cv = allVarients.filter((v) => { return ids.includes(v._id); });

    return cv;
}

const getDefaultVarient = (varients, skuID) => {

    if(skuID) {
        var def = varients.filter((v) => { return (v.skuID === skuID); });
    }
    else {
        var def = varients.filter((v) => { return v.isDefault; });
    }

    
    return def[0] ? def[0] : varients[0];
}

const getNewVarientObject = () => {
    return (
        {
            "skuID": "",
            "productTitle": "",
            "productDescription": "",
            "media": [],
            "isActive": true,
            "dicountedListPrice": "",
            "listPrice": "",
            "EANCode": "",
            "HSNCode": "",
            "taxPercentage": "",
            "color": null,
            "size": null,
            "_id": `__NEW__${uuidv4()}`
        }
    );
}

const matchVarient = (v1, v2) => {
    if(v1.color === v2.color && v1.size === v2.size) {
        return true;
    }

    return false;
} 

const getCombinationLabels = (arr1, arr2) => {
    const combinations = {labels: [], objects: []}

    arr1.forEach((c) => {
        arr2.forEach((s) => {
            if(!c && !s) return;
            else if(c && !s) {
                combinations.labels.push(c);
                combinations.objects.push({color: c, size: null});
            } 
            else if(!c && s) {
                combinations.labels.push(s);
                combinations.objects.push({size: s, size: null});
            }
            else {
                combinations.labels.push(`${c} - ${s}`);
                combinations.objects.push({color: c, size: s});
            } 
        });
    });

    return combinations;
}

const getCombinationObject = (colors, sizes, defaultV) => {

    const combinations = [];

    if(sizes.length && colors.length) {
        colors.split(':').forEach((c) => {
            sizes.split(':').forEach((s) => {
                combinations.push({color: c, size: s})
            })
        })

        return combinations;
    }
    else if(colors.length) {
        const output = [];

        colors.split(':').forEach((c) => {
            if(c.length === 0) {
                return
            }
            output.push({color: c, size: null})
        })

        return output;
    }
    else if(sizes.length) {
        const output = [];

        sizes.split(':').forEach((s) => {
            if(s.length === 0) {
                return
            }
            output.push({color: null, size: s})
        });

        return output;
    }
    else {
        return; // more validation
    }

    
}

const getVarients = (list) => {
    let colors = [];
    let sizes = [];
    let categories =[];

    list.forEach((l) => {
        if(colors.indexOf(l.color) === -1) {
            colors.push(l.color)
        }
        if(sizes.indexOf(l.size) === -1) {
            sizes.push(l.size)
        }
    });

    colors = colors.length > 1 ? colors.join(':') : (colors[0] ? colors[0] : "")
    sizes = sizes.length > 1 ? sizes.join(':') : (sizes[0] ? sizes[0] : "")


    if(colors && colors.length) {
        categories.push('color');
    }
    if(sizes && sizes.length) {
        categories.push('size');
    }

    return {initVarients: categories, initColorVarients: colors, initSizeVarients: sizes}
}

export {
        getCombinations,
        getVarientName, 
        pickCurrentVarients, 
        getDefaultVarient, 
        getNewVarientObject, 
        matchVarient,
        getCombinationLabels,
        getVarients,
        getCombinationObject
    }