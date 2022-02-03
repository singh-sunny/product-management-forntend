import {Label, LABEL_TYPES} from '../../../components/labels';
import {LocStrings} from '../../../i18n/i18n'

const listItem = (items) => {

    const currency = '$';

    if(!items.length) {
        return;
    }
    const cb = (props) => {
        const output = [];
        items.forEach((i) => {
            const parentId = i._id;
            const v = i.varients;
    
            // varients.forEach((v) => {
                let detail = v.color ? v.color : '';
                detail = detail +  (v.size ? ` ${v.size}` : '');
    
                const li = (<li key={v._id} className={props.className || ''}>
                    <div>{<img src={v.media[0].path} />}</div>
                    <div><a className="product" id={`${parentId}`}>{v.productTitle}</a></div>
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
                    <div></div>
                    
                </li>);
    
                output.push(li);
            // });
        });

        return output;
    }

    return cb;

    
}

export {listItem as productListItem};