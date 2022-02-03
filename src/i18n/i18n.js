import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   homePageTitle: "Product Catalog master",
   editProductPageTitle: "Edit Product",
   addProductBtnLabel: "+ Add product",
   addProduct: "Add Product",
   productSearchInputBoxPlaceHolder: "Search by Product Name or SKU Id",
   isActive: "Active",
   isInActive: "Inactive",
   save: 'Save',
   cancel: 'cancel',
   produtTitle: "Product title",
   productDescription: "Product description",
   discountedPrice: "Discounted List price(post tax)",
   listPrice: "List price (post tax)",
   EANCode: "EAN Code",
   HSNCode: "HSN Code",
   taxPercentage: "Tax percentage",
   SKUID: "SKU Id",
   productDetails: "Product Title",
   productMedia: "Product Media",
   addVarients: "Add Varients",
   faq: "FAQ",
   addImagesVideos: "Add images/video",
   invalidInput: "Invalid input. Please see varients for error",
   editVarients: "Edit varients",
   varients: "Varients",
   defaultVarient: "Default Varient",
   deleteVarientWarning: "Deleting varient will remove all its details, are you sure you want to do this?",
   deleteVarientWarningTitle: "Delete Varient"
 },
 it: {
   
 }
});

export {strings as LocStrings};