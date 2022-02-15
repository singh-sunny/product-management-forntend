import {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTv } from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonTypes} from '../button';
import {LocStrings} from '../../i18n/i18n';
import { v4 as uuidv4 } from 'uuid';
import SimpleImageSlider from "react-simple-image-slider";


const MediaDetails = (props) => {

    props.getUserInputRef.current.getUserInput = () => {
        setIsSubmit(true);
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
    const [isSubmit, setIsSubmit] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

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


     const onDragOver = (event) => {
         console.log('ksajdfhklasdfhj')
        event.preventDefault();
        //const elem = document.querySelector('.section.media-section');
        event.currentTarget.classList.add('file-drop');
     }

     const onDrop = (event) => {
        event.preventDefault();
        //const elem = document.querySelector('.section.media-section');
        event.currentTarget.classList.remove('file-drop');

        setMedia((prev) => { 
            let newFiles=[];
            const list  = event.dataTransfer.files;
    
            for(let i=0; i < list.length; i++) {
                const newFile = list.item(i);
                newFile._id = `__NEW__${uuidv4()}`
                newFiles.push(list.item(i));
            }
            
            return ([...prev, ...newFiles]);
         })
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        // const elem = document.querySelector('.section.media-section');
        event.currentTarget.classList.remove('file-drop');
    }

    const showMediaPreview = () => {
        const urls = media.map((m) => {
            return {url: (m.originalFilename ? ('http://localhost:3001/' + m.path.replace('public/', '')) : URL.createObjectURL(m))};
        });

        setShowPreview(urls)
    }
    
    return (
        <div onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} className={"section media-section" + ( isSubmit && !media.length ? " invalid" : "" )}>
            <div className="header-row">
                <h2 className="text-section-header">
                    <span>{LocStrings.productMedia}</span>
                    <span className="isrequired-astrisk">&nbsp;*</span>
                    <div style={{fontSize: '12px', fontWeight: 'normal', marginLeft: '2px', display: 'inline-block'}}>(Drag and drop media here or use button to upload files)</div>
                </h2>
                <div style={{cursor: 'pointer'}} onClick={showMediaPreview}>
                    <FontAwesomeIcon icon={faTv} className="imgae-upload" />
                </div>
            </div>
            <div className="uploaded-files">
                {
                    media.map((m) => { 
                            return (<FileTag 
                                        key={m._id || m.id}
                                        id={m._id || m.id}
                                        tagText={m.name || m.originalFilename}
                                        mediaa={m}
                                        onDelete={(e) => { deleteSelectedFile(e.target.getAttribute('id')) }}
                            />)
                    })
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
            {showPreview ? <PreveiwMedia urls={showPreview} setShowPreview={setShowPreview} /> : null}
        </div>
    );
}

const FileTag = (props) => {

    //const m = props.mediaa;

    //if(props.showTag) {
        return(<div className="tag"><span>{props.tagText}</span><span id={props.id} onClick={props.onDelete}>x</span></div>);
    // }
    // else {
    //     return (
    //     <div className="" style={{position: 'relative', marginRight: '20px'}}>
    //         <span id={props.id} className="image-tag-cross"  onClick={props.onDelete}>x</span>
    //         <img height="50" width="50" src={m.name ? URL.createObjectURL(m) : 'http://localhost:3001/' + m.path.replace('public/', '') } />
    //     </div>);
    // }

    
}

const PreveiwMedia = (props) => {

    if(!props.urls.length) {
        return null;
    }

    return (
        <div className="modal">
                <div className="modal-main" style={{background: 'transparent'}}>
                    <span className="close-preview" onClick={() => {props.setShowPreview(false)}}>x</span>
                    <SimpleImageSlider 
                        images={props.urls}
                        showBullets={true}
                        showNavs={true}
                        width={700}
                        height={400}
                    />
                </div>
            </div>
    );
}

export { MediaDetails };