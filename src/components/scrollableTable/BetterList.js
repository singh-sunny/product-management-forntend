import React from "react";
import {Label, LABEL_TYPES} from '../labels';
import {LocStrings} from '../../i18n/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const THRESHOLD = 20;
class SlidingWindowScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: THRESHOLD
    };
    this.$bottomElement = React.createRef();
    this.$topElement = React.createRef();
  }

  componentDidMount() {
    this.intiateScrollObserver();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.end !== this.state.end) || (prevState.start !== this.state.start) || this.props.list.length !== prevProps.list.length) {
      this.intiateScrollObserver();
    }
  }

  intiateScrollObserver = () => {
    const options = {
      root: document.querySelector('.list-wrapper'),
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver(this.callback, options);
    if (this.$topElement.current) {
      this.observer.observe(this.$topElement.current);
    }
    if (this.$bottomElement.current) {
      this.observer.observe(this.$bottomElement.current);
    }
  }

  callback = (entries, observer) => {
    if(this.props.list.length <= THRESHOLD) {
        return;
    }

    entries.forEach((entry, index) => {
      const listLength = this.props.list.length;
      const {start, end} = this.state;
      // Scroll Down
      // We make increments and decrements in 10s
      if (entry.isIntersecting && entry.target.getAttribute('helper_id') === "bottom") {
        const maxStartIndex = listLength - 1 - THRESHOLD;     // Maximum index value `start` can take
        const maxEndIndex = listLength - 1;                   // Maximum index value `end` can take
        const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex;
        const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex;
        this.updateState(newStart, newEnd);
      }
      // Scroll up
      if (entry.isIntersecting && entry.target.getAttribute('helper_id') === "top") {
        const newEnd = end === THRESHOLD ? THRESHOLD : (end - 10 > THRESHOLD ? end - 10 : THRESHOLD);
        let newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0);
        this.updateState(newStart, newEnd);
      }
    });
  }

  resetObservation = () => {
    this.observer.unobserve(this.$bottomElement.current);
    this.observer.unobserve(this.$topElement.current);
    this.$bottomElement = React.createRef();
    this.$topElement = React.createRef();
  }

  updateState = (newStart, newEnd) => {
    const {start, end} = this.state;
    if (start !== newStart || end !== newEnd) {
      this.resetObservation();
      this.setState({
        start: newStart,
        end: newEnd
      });
    }
  }

  getReference = (index, isLastIndex) => {
    if (index === 0)
      return this.$topElement;
    if (isLastIndex) 
      return this.$bottomElement;
    return null;
  }

  render() {
    const {list, height} = this.props;
    const {start, end} = this.state;
    console.log(end)
    console.log(list.length)
    const updatedList = list.slice(start, end+1);
    const lastIndex = updatedList.length - 1;
    //const items = this.props.list;
    const productClickHandler = this.props.listItemClickHandler;


    const currency = '$';

    if(!list.length) {
        return (<div className="no-data">No Data</div>)
    }

    const listClickHandler = (e) => {
        if(e.target.classList.contains('product-item') || e.target.tagName === 'path') {
            e.preventDefault();
            const productID = e.currentTarget.getAttribute('id');
            const selectedSKUID = e.currentTarget.getAttribute('skuid');
            productClickHandler(productID, selectedSKUID)
        }
    }

    return (
        <ul className="list-wrapper" style={{position: 'relative'}}>
            {
                updatedList.map((i, k) => {

                    const top = (height * (k + start)) + 'px';
                    const refVal = this.getReference(k, k === lastIndex);
                    const helper_id = k === 0 ? 'top' : (k === lastIndex ? 'bottom' : '');
                    
                    const parentId = i._id;
                    const v = i.varients;
            
                    
                        let detail = v.color ? v.color : '';
                        detail = detail +  (v.size ? ` ${v.size}` : '');

                        const imgPath = 'http://localhost:3001/' + v.media[0].path.replace('public/', '');
            
                        const li = (<li key={v._id} skuid={v.skuID} className="list-item" onClick={listClickHandler} id={`${parentId}`}  style={{top}} ref={refVal} helper_id={helper_id}>
                            <div>{<img src={imgPath} height="50" width="50"/>}</div>
                            <div><a style={{cursor: 'pointer'}} className="product-item" id={`${parentId}`} >{v.productTitle}</a></div>
                            <div>{v.skuID}</div>
                            <div>
                                {
                                    v.isActive ? 
                                    <Label type={LABEL_TYPES.SUCCESS} text={LocStrings.isActive} /> :
                                    <Label type={LABEL_TYPES.ERROR} text={LocStrings.isInActive} />
                                }
                            </div>
                            <div>{`${currency}${v.listPrice}`}</div>
                            <div>{detail}</div>
                            <div >
                                <div className="product-item" style={{display: 'inline', cursor: 'pointer'}} id={`${parentId}`} ><FontAwesomeIcon icon={faPencilAlt} /></div>
                            </div>
                            
                        </li>);

                        return li;
                    })
            }
        </ul>  
    )
  }
}

export default SlidingWindowScroll;