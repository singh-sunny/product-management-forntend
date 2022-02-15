
import React, {useState, Suspense} from 'react';
import './App.scss';
import ProductList from './pages/products/product-list';
//import ProductCreate from './pages/products/product-create';
//import ProductEdit from './pages/products/product-edit';
import {Spinner} from './components/spinner';
const ProductCreate = React.lazy(() => import('./pages/products/product-create'));
const ProductEdit = React.lazy(() => import('./pages/products/product-edit'));

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

  const props = {
    setNotification: setNotification,
    navigateTo: navigate,
    APP_PAGES: APP_PAGES
  }

  switch(pageDetails.page) {
    case APP_PAGES.ProductList:
      Page = <ProductList {...props} {...pageDetails.params} />
      break;
    case APP_PAGES.ProductEdit:
      //Page = <ProductEdit {...props} {...pageDetails.params} />
      Page = (<Suspense fallback={<Spinner />}>
        <ProductEdit {...props} {...pageDetails.params} />
      </Suspense>)
      break;
    case APP_PAGES.ProductCreate:
      //Page = <ProductCreate {...props} {...pageDetails.params} />
      Page = (<Suspense fallback={<Spinner />}>
        <ProductCreate {...props} {...pageDetails.params} />
      </Suspense>)
      break;
  }

  return Page;
}

export default App;
export {APP_PAGES}
