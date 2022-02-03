
import {useState} from 'react';
import './App.scss';
import ProductList from './pages/products/product-list';
import ProductCreate from './pages/products/product-create';
import ProductEdit from './pages/products/product-edit';

const APP_PAGES = {
  ProductList: 'ProductList',
  ProductEdit: 'ProductEdit',
  ProductCreate: 'ProductCreate'
}

function App() {
  const [page, setPage] = useState({page: APP_PAGES.ProductList, params: null});
  const navigate = (page, params) => {setPage({page: page, params: params})}
  const [notification, setNotification] = useState(false) //false, 'success:message', 'error:message'
  
  return (
    <div className="App">
      {notification ? 
        <div className={notification.split(':')[0] === 'success' ? "notification notification-success" : "notification notification-error"}>
          {notification.split(':')[1]}
        </div>
        : null
      }
      
      {renderPage(page, navigate, setNotification)}
    </div>
  );
}

const renderPage = (pageDetails, navigate, setNotification) => {
  let Page = null;

  switch(pageDetails.page) {
    case APP_PAGES.ProductList:
      Page = <ProductList setNotification={setNotification} navigateTo={navigate} APP_PAGES={APP_PAGES} {...pageDetails.params} />
      break;
    case APP_PAGES.ProductEdit:
      Page = <ProductEdit setNotification={setNotification} navigateTo={navigate} APP_PAGES={APP_PAGES} {...pageDetails.params} />
      break;
    case APP_PAGES.ProductCreate:
      Page = <ProductCreate setNotification={setNotification} navigateTo={navigate} APP_PAGES={APP_PAGES} {...pageDetails.params} />
      break;
  }

  return Page;
}

export default App;
export {APP_PAGES}
