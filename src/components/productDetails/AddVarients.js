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
    

    return (
        <Modal>
            <div className="add-varients">
                <div className="add-varient-header">
                    {LocStrings.varients}
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
                            />
                        )
                    })}
                                    
                    <Button 
                        klass="add-varient-btn"
                        btnType={ButtonTypes.STANDARD_BUTTON}
                        buttonLabel={LocStrings.addVarients}
                        onClick={() => {
                            if(varients.length === varnts.length) return;
                            setVarients([...varients, ...[varnts[varients.length]]])
                        }}
                    />

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
                                        JSON.parse(defaultSelectionRef.current.value)
                                    );
                                    props.closeModal();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
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
    }

    const onTagRemoveClick = (e) => {
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

export {AddVarient}