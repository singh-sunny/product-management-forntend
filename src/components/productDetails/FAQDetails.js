import {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonTypes} from '../button';
import {Input, Textarea } from '../textInput';
import {LocStrings} from '../../i18n/i18n';
import { v4 as uuidv4 } from 'uuid';

const FAQDetails = (props) => {
    let product = props.product;
    let propFaqs = [];
    
    if(product && product.faq && product.faq.length) {
        propFaqs = product.faq;
    }
    else {
        propFaqs.push({_id: `__NEW__${uuidv4()}`});
    }

    const [faqs, setFaqs] = useState(propFaqs);
    const [deletedFAQs, setDeletedFaq] = useState([]);
    
    const getFaqInput = useRef({});

    const addNewFaq = () => {
        setFaqs((prev) => {
            return [...prev, ...[{_id: `__NEW__${uuidv4()}`}]]
        });
    };

    const deleteFAQ = (id) => {
        setFaqs((prev) => {
            const newfaqs = []

            for(let i = 0; i < prev.length; i++) {
                if(prev[i]._id === id) {
                    if(!(/^__NEW__/).test(id)) {
                        setDeletedFaq((prev) => {
                            return ([...prev, ...[id]]);
                        })
                    }

                    continue;
                }
                else {
                    newfaqs.push(prev[i]);
                }
            }

            return newfaqs;
        });
    }

    props.getUserInputRef.current.faq = {};

    props.getUserInputRef.current.faq.getUserInput = () => {
        const input = {created: [], updated: [], deleted: deletedFAQs}

        faqs.forEach((f) => {
            const item = getFaqInput.current[f._id].getUserInput();

            if(!(/^__NEW__/).test(item._id)) {
                input.updated.push(item);
            }
            else {
                input.created.push({question: item.question, answer: item.answer});
            }
        });

        console.log(input);

        return input;
    }
    

    return(
        <div className="section faq-section">
            <div className="header-row">
                <h2 className="faq-section-header">{LocStrings.faq}</h2>
            </div>
            {
                faqs.map((faq, i) => {
                    getFaqInput.current[faq._id] = {getUserInput: null};
                    return(<FAQ key={faq._id} faq={faq} getUserInputRef = {getFaqInput} deleteFAQ={deleteFAQ}/>);
                })
            }
            <div className="add-faq-button-wrapper">
                <Button 
                    btnType={ButtonTypes.SMALL_BUTTON}
                    buttonLabel={'Add Question'}
                    onClick={addNewFaq}
                />
            </div>
            
        </div> 
    );
};

const FAQ = (props) => {

    const id = props.faq._id;
    const [que, setQue] = useState(props.faq.question ? props.faq.question : '');
    const [ans, setAns] = useState(props.faq.answer ? props.faq.answer : '');

    const getUserInput = () => {
        const userInput = {question: que, answer: ans, _id: id};
        return userInput;
    }

    props.getUserInputRef.current[id]['getUserInput'] = getUserInput;

    return (
        <div className="faq">
            <div className="qa">
                <Input klass={'faq-question'} value={que} onChange={(e) => {setQue(e.target.value)}} />
                <Textarea klass={'faq-answer'} value={ans} onChange={(e) => {setAns(e.target.value)}} />  
            </div>
            <div className="delete-icon-wrapper" id={id} onClick={(e) => { props.deleteFAQ(e.currentTarget.getAttribute('id')) }}>
                <FontAwesomeIcon id={id} icon={faTrashAlt} className="delete-icon" />
            </div>
        </div>
    );
}

export { FAQDetails };