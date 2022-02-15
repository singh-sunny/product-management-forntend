import './spinner.scss';

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="ellipsis">
                <div className="elipse-1"></div>
                <div className="elipse-2"></div>
                <div className="elipse-3"></div>
                <div className="elipse-4"></div>
            </div>    
        </div>
    )
}

const FullScreenSpinner = () => {
    return (
        <div className="modal">
            <div className="spinner">
                <div className="ellipsis">
                    <div className="elipse-1"></div>
                    <div className="elipse-2"></div>
                    <div className="elipse-3"></div>
                    <div className="elipse-4"></div>
                </div>    
            </div>
        </div>
        
    )
}

export {Spinner, FullScreenSpinner};