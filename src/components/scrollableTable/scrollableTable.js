import './scrollableTable.scss';
import { ListeHeader } from  './ListHeader';
import { List } from  './List';
import SlidingWindowScroll from './BetterList'


/**
 * `design prop`::For table customization, can use it to provide differnt styles or features of table 
 */

const ScrollableTable = (props) => {
    return (
        <div className="list-container">
            <ListeHeader {...props} />
            {/* <List {...props} /> */}
            <SlidingWindowScroll {...props} />
        </div>
    );
};

export { ScrollableTable };