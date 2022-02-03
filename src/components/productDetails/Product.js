import {useState} from 'react'
import {AddVarient} from './AddVarients';
import {LeftPanel} from './LeftPanel';
import {RightPanel} from './RightPanel';
import {getCombinations, getDefaultVarient, getNewVarientObject, matchVarient} from './productUtil';


import './product.scss';

const Product = (props) => {
    const product = props.product;

    const [varients, setVarients] = useState(props.isCreateFlow ? [getNewVarientObject()] : product.varients); // real objects
    const [currentVarients, setCurrentVarients] = useState(props.isCreateFlow ? varients : getCombinations(product.varients)); // array of varient combination labels
    const [showAddVarientModal, setShowAddVarientModal] = useState(false);
    const [selectedVarient, setSelectedVarient] = useState(props.isCreateFlow ? varients[0]._id : getDefaultVarient(product.varients)._id);

    if(props.isCreateFlow) {
        props.currentVarientsRef.current.getCurrentVarients = () => {
            return currentVarients;
        }
    }
    else {
        //for edit case
        props.currentAndDeletedVarientsRef.current.getCurrentAndDeletedVarients = () => {
            const cv = currentVarients.map((v) => { return v._id });

            const deletedVarients = [];

            props.product.varients.forEach((v) => {
                if(cv.indexOf(v._id) === -1) {
                    deletedVarients.push(v);
                }
            }) 

            return {currentVarients, deletedVarients}
        }
    }
    

    

    return (
        <div className="product">
            <div className={`left-panel`}>
                <LeftPanel 
                    currentVarients={currentVarients} 
                    validationErrors={{}} 
                    addEditVarientButtonClick={() => {setShowAddVarientModal(true)}}
                    selectedVarient={selectedVarient}
                    setSelectedVarient={setSelectedVarient}
                    selectedVarient={selectedVarient}
                    {...props}
                />
            </div>
            <div className="right-panel">
                <RightPanel 
                    currentVarients={currentVarients} 
                    allVarients={varients}
                    selectedVarient={selectedVarient}
                    {...props}
                />
            </div>
            {
                showAddVarientModal ? 
                    (
                        <AddVarient 
                            closeModal={() => {setShowAddVarientModal(false)}} 
                            onSave={(newVarients, defaultValue) => {saveCB(
                                setSelectedVarient,
                                setCurrentVarients,
                                setVarients,
                                varients,
                               newVarients,
                               defaultValue
                            )}}
                            currentVarients={currentVarients}
                            defaultValue={selectedVarient}
                        />
                    ) : 
                    null
            }
        </div>
    );
};

const saveCB = (setSelectedVarient, setCurrentVarients, setVarients, varients, newVarientCombinations, defaultValue) => {

    let newCurrentVarients = [];
    let newVarients = [];


    newVarientCombinations.forEach((nv) => {
        let isMatch = false;

        varients.forEach((v) => {
            if(matchVarient(v, nv)) {
                newVarients.push(v);
                isMatch = true;
            }
        })

        if(!isMatch) {
            const vo = getNewVarientObject();
            vo.size = nv.size;
            vo.color = nv.color;
            newCurrentVarients.push(vo);
            newVarients.push(vo); 
        }
    });

    newVarients = getCombinations(newVarients);
    setCurrentVarients(newVarients);

    newVarients.forEach((v) => {
        if(matchVarient(v, defaultValue)) {
            setSelectedVarient(v._id);
        }
    })
    
    setVarients((prev) => {
        console.log([...prev, ...newCurrentVarients])
        return [...prev, ...newCurrentVarients];
    });
}


export { Product };