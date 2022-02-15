import {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonTypes} from '../button';
import {LocStrings} from '../../i18n/i18n';
import {Modal} from '../modal'
// import {ConfirmationModal} from '../ConfirmationModal'
import {getCombinationLabels, getVarients, getCombinationObject} from './productUtil';

import './addVarient.scss';

const varnts = ['color', 'size'];


const AddVarient = (props) => {
    const {initVarients, initColorVarients, initSizeVarients} = getVarients(props.currentVarients);

    const [varients, setVarients] = useState(initVarients);
    const [colorVarient, setColorVarient] = useState(initColorVarients);
    const [sizeVarient, setSizeVarient] = useState(initSizeVarients);
    const [defaultVarient, setDefaultVarient] = useState(null);
    const defaultSelectionRef = useRef();
    const [deleteVarientConfirmation, setDeleteVarientConfirmation] = useState(false);
    const deleteConfirmationCB = useRef(() => {});
    

    return (
        <>
        <Modal>
            <div className="add-varients">
                <div className="modal-header">
                    <span>{LocStrings.varients}</span>
                    <span className="close-button" onClick={props.closeModal}>x</span>
                </div>
                <div className="add-varient-section">
                    {varients.map((v) => { 
                        console.log(v);

                        return (
                            <VarientAdd
                                key={v}
                                varientCategory={v}
                                colorVarient={colorVarient}
                                sizeVarient={sizeVarient}
                                setVarients={setVarients} 
                                setColorVarient={setColorVarient}
                                setSizeVarient={setSizeVarient}
                                selectedVarientCategories={varients}
                                setSelectedVarientCategories={setVarients}
                                setDeleteVarientConfirmation={setDeleteVarientConfirmation}
                                deleteConfirmationCB={deleteConfirmationCB}
                            />
                        )
                    })}
                     <div className="add-varient-btn-wrapper">
                        <Button 
                            klass="add-varient-btn"
                            btnType={ButtonTypes.STANDARD_BUTTON}
                            buttonLabel={LocStrings.addVarients}
                            onClick={() => {
                                if(varients.length === varnts.length) return;
                                setVarients([...varients, ...[varnts[varients.length]]])
                            }}
                        />
                    </div>               
                    

                    <div className="default-selector-wrapper">
                        <div>{LocStrings.defaultVarient}</div>
                        <DefaultVarientSelection
                            value={defaultVarient}
                            colorVarient={colorVarient}
                            sizeVarient={sizeVarient}
                            onChange={(e) => {setDefaultVarient(e.target.value)}}
                            defaultSelectionRef={defaultSelectionRef}
                        />
                        
                        <div className="add-varient-button-wrapper">
                            <Button 
                                klass="add-varient-btn"
                                btnType={ButtonTypes.STANDARD_BUTTON}
                                buttonLabel={LocStrings.cancel}
                                onClick={props.closeModal}
                            />
                            <Button 
                                klass="add-varient-btn"
                                btnType={ButtonTypes.STANDARD_BUTTON}
                                buttonLabel={LocStrings.save}
                                onClick={() => {
                                    props.onSave(
                                        getCombinationObject(colorVarient, sizeVarient),
                                        (defaultSelectionRef.current.value ? JSON.parse(defaultSelectionRef.current.value) : "")
                                    );
                                    props.closeModal();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        {deleteVarientConfirmation ? <DeleteConfirmation deleteConfirmationCB={deleteConfirmationCB} setDeleteVarientConfirmation={setDeleteVarientConfirmation} /> : null}
        </>
    )
}


const VarientAdd = (props) => {
    const varientCategory = props.varientCategory;
    let currentVarients = varientCategory === varnts[0] ? props.colorVarient : props.sizeVarient;
    let setCurrentVarients = varientCategory === varnts[0] ? props.setColorVarient : props.setSizeVarient;
    const setSelectedVarientCategories = props.setSelectedVarientCategories;

    const tagInputKeyPressHandler = (e) => {
        if(e.charCode !== 13) return;

        const text = (e.target.value).trim();
        if(!text) return;
        
        setCurrentVarients((prev) => {
            const newVal = prev ? `${prev}:${text}` : text;
            return newVal;
        });
        
        e.target.value = '';
    }

    const deleteVarienCategoryHandler = () => {
        props.deleteConfirmationCB.current = () => {
            setSelectedVarientCategories((prev) => {
                const newVal = [];
    
                for(let i = 0; i <prev.length; i++) {
                    if(prev[i] === varientCategory) {
                        continue;
                    }
                    else {
                        newVal.push(prev[i])
                    }
                }
    
                return newVal;
            });
    
            setCurrentVarients('');
        };
        props.setDeleteVarientConfirmation(true);
        return;

        // setSelectedVarientCategories((prev) => {
        //     const newVal = [];

        //     for(let i = 0; i <prev.length; i++) {
        //         if(prev[i] === varientCategory) {
        //             continue;
        //         }
        //         else {
        //             newVal.push(prev[i])
        //         }
        //     }

        //     return newVal;
        // });

        // setCurrentVarients('');
    }

    const onTagRemoveClick = (e) => {
        props.deleteConfirmationCB.current = () => {
            const varientToRemove = e.target.getAttribute('id')
        
            setCurrentVarients((prev) => {
                let newValues = [];
                prev.split(':').forEach((p) => {
                    if(p === varientToRemove) {
                        return;
                    }
                    newValues.push(p);
                });

                return newValues.join(':')
            })
        }

        props.setDeleteVarientConfirmation(true);
        return;

        // const varientToRemove = e.target.getAttribute('id')
        

        // setCurrentVarients((prev) => {
        //     let newValues = [];
        //     prev.split(':').forEach((p) => {
        //         if(p === varientToRemove) {
        //             return;
        //         }
        //         newValues.push(p);
        //     });

        //     return newValues.join(':')
        // })
    }

    return (
        <div className="varient-row">
                <div className="varient">{props.varientCategory}</div>
                <div className="add-tags">
                    <div className="tags-container">
                        {
                            currentVarients.length ? (
                                currentVarients.split(':').map((v) => { return (<Tag onClick={onTagRemoveClick} key={v} tagText={v} />) })
                            ) : null
                        }
                    </div>
                    <input className="tag-input" type="text" onKeyPress={tagInputKeyPressHandler} />
                </div>
                <FontAwesomeIcon icon={faTrashAlt} color="red" className="varient-delete" onClick={deleteVarienCategoryHandler} />
            </div>
    );
}

const Tag =  (props) => {
    return(<div className="tag"><span>{props.tagText}</span><span id={props.tagText} onClick={props.onClick}>x</span></div>);
}

const DefaultVarientSelection = (props) => {
    const {labels, objects} = getCombinationLabels(props.colorVarient.split(':'), props.sizeVarient.split(':'));

    return (
        <select ref={props.defaultSelectionRef} value={props.defaultVarient} onChange={props.onChange} className="default-varient-selector">
            {labels.map((o, i) => {return (<option value={JSON.stringify(objects[i])} key={o}>{o}</option>) })}
        </select>
    );
}


const DeleteConfirmation = (props) => {

    const delectClickd = () => {
        props.deleteConfirmationCB.current();
        props.deleteConfirmationCB.current = () => {};
        props.setDeleteVarientConfirmation(false);
    }

    return (
        
        <div className="modal delete-varient-confirmation" >
            <div className="modal-main">
                <div className="modal-header">
                        <span>Delete Varient</span>
                        <span className="close-button" onClick={() => {props.setDeleteVarientConfirmation(false)}}>x</span>
                    </div>
                    <div className="warning-content">
                        Deleting a varient will remove all its details. Are you sure you want to do this?
                    </div>
                    <div className="buttons-wrapper" style={{height: "50px", display: 'flex'}}>
                        <div className="btn no-button" onClick={() => {props.setDeleteVarientConfirmation(false)}} >No</div>
                        <div className="btn yes-button" onClick={delectClickd}>Delete</div>
                    </div>
            </div>
        </div>
    )
}

export {AddVarient}