import {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonTypes} from '../button';
import {LocStrings} from '../../i18n/i18n';
import { v4 as uuidv4 } from 'uuid';


const MediaDetails = (props) => {

    props.getUserInputRef.current.getUserInput = () => {
        if(media.length === 0) {
            return ({error: ['No media supplied'], media: null});
        }
        else {
            const input = {created: [], deleted: []};

            media.forEach((m) => {
                if((/__NEW__/).test(m._id)) {
                    input.created.push(m);
                }
            })

            deletedMedia.forEach((m) => {
                let path = ``;

                props.varient.media.forEach((k) => {
                    if(k._id === m._id) {
                        path = k.path;
                    }
                })

                input.deleted.push(`${props.varient.skuID}:${m._id}:${path}`)
            });

            input.error = [];

            return input;
        }
    }


    const [deletedMedia, setDeleteMedia] = useState([]);
    const [media, setMedia] = useState(props.varient.media || []);

    const fileInputRef = useRef();
    
    const triggerMediaSelection = () => { fileInputRef.current.click(); }
    const fileInpuChanged = (e) => {setMedia((prev) => { 
        let newFiles=[];
        const list  = e.target.files;

        for(let i=0; i < list.length; i++) {
            const newFile = list.item(i);
            newFile._id = `__NEW__${uuidv4()}`
            newFiles.push(list.item(i));
        }
        
        return ([...prev, ...newFiles]);
     })};

     const deleteSelectedFile = (id) => {
        setMedia((prev) => {
            let newFiles=[];
            
            for(let i=0; i < prev.length; i++) {
                if(prev[i]._id === id) {
                    const deletedM = prev[i]
                    if(!(/__NEW__/).test(id)) {
                        setDeleteMedia((prev) => {
                            return ([...prev, ...[deletedM]]);
                        })
                    }
                    continue;
                }
                else {
                    newFiles.push(prev[i]);
                }
            }
            
            return newFiles;
        });
     }
    
    return (
        <div className="section media-section">
            <div className="header-row">
                <h2 className="text-section-header">
                    <span>{LocStrings.productMedia}</span>
                    <span className="isrequired-astrisk">&nbsp;*</span>
                </h2>
            </div>
            <div className="uploaded-files">
                {
                    media.map((m) => { return <FileTag key={m._id || m.id} id={m._id || m.id} tagText={m.name || m.originalFilename} onDelete={(e) => { deleteSelectedFile(e.target.getAttribute('id')) }}/> })
                }
            </div>
            <div className="media-upload-controls">
                <FontAwesomeIcon size="5x" icon={faImage} className="imgae-upload" />
                <div className="upload-controls" onClick={triggerMediaSelection}>
                    <Button 
                        btnType={ButtonTypes.SMALL_BUTTON}
                        buttonLabel={LocStrings.addImagesVideos}
                        onClick={() => {}}
                    />
                </div>
            </div>
            <input ref={fileInputRef} className="product-media-file-input hide" type="file" multiple onChange={fileInpuChanged} />
        </div>
    );
}

const FileTag = (props) => {
    return(<div className="tag"><span>{props.tagText}</span><span id={props.id} onClick={props.onDelete}>x</span></div>);
}

export { MediaDetails };