import { database, storage } from '../firebase';
import { set, ref as databaseRef, onValue } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export function writeProductData(name, description, imageUrl, price, brand, careAbout, productType, skinType) {
  set(databaseRef(database, 'products/' + name), {
    id: v4(),
    name,
    description,
    imageUrl,
    price,
    brand,
    careAbout,
    productType,
    skinType
  });
};

export const uploadImageHandler = (imageUrl, setImageUrl, setIsUploaded) => (e) => {
  e.preventDefault();

  if (imageUrl == null) {
    return;
  }

  const imageRef = storageRef(storage, `images/${imageUrl.name + v4()}`)

  uploadBytes(imageRef, imageUrl)
    .then((response) => {
      alert('image Uploaded');

      let metadata = Object.values(response);

      let imageName = metadata[0].name;

      getDownloadURL(storageRef(storage, `/images/${imageName}`))
        .then((url) => {
          setImageUrl(url);
          setIsUploaded(true)
        });
    })
    .catch((error) => {
      alert(error);
    });
};

export const createProductSubmitHandler = (imageUrl, setIsUploaded) => (e) => {
  e.preventDefault();

  const { name, description, price, brand, careAbout, productType, skinType } = Object.fromEntries(new FormData(e.currentTarget));

  try {
    writeProductData(name, description, imageUrl, price, brand, careAbout, productType, skinType);
    alert('Successful writing of product data');

    e.currentTarget.reset();
    setIsUploaded(false);
  } catch (error) {
    alert(error)
  }
};

let productsArray = [];

export const getAll = (reference, setProductsToContext, setProductsToAnotherContext) => {

  onValue(databaseRef(database, reference), (snapshot) => {
    const productsData = snapshot.val();
    Object.values(productsData).map((product) => {
      productsArray = [...productsArray, product];
    });

    if (productsArray) {
      //console.log(JSON.stringify(productsArray, null, 4));
      setProductsToContext([...productsArray]);
      setProductsToAnotherContext([...productsArray]);
     // alert('Products in body are set')
    } else {
      console.log('There are no products to display')
    }
  });
};

export const filterItemsByCheckboxCriteria = (items, filterCheckedValues = [], setProductsToContext) => {
  let filteredProducts = [];
  if (filterCheckedValues.length === 0) {
    setProductsToContext([...items]);
  } else {
    filterCheckedValues.map((filterValue) => {
      let key = Object.keys(filterValue);
      //console.log('key: ' + key);

      items.filter((item) => {
        if (item[key].toLowerCase() === filterValue[key].toLowerCase() && filteredProducts.every((product) => product.id !== item.id)) {
          filteredProducts = [...filteredProducts, item];
          
          console.log('filteredProducts: ' + JSON.stringify(filteredProducts, null, 4));
        }
      })
    });
    console.log('final filteredProducts: ' + filteredProducts);
    alert('Successfull filtering')
    setProductsToContext([...filteredProducts]);
  }
};

export const searchItems = (items, searchedValue, setProductsToContext) => {
  console.log(searchedValue);
  let filteredItems = [];
  if (searchedValue) {
    items.map((item) => {
      console.log(Object.values(item));
      console.log(typeof (Object.values(item)));
      Object.values(item).map((itemValue) => {
        let value = itemValue.toString().toLowerCase();
        if (value.includes(searchedValue.toLowerCase()) && filteredItems.every((product) => product.id !== item.id)) {
          filteredItems = [...filteredItems, item];
          console.log('filteredItems in searchItems: ' + JSON.stringify(filteredItems, null, 4));
        }
      });
    });
    
    console.log('final filteredItems in searchItems: ' + JSON.stringify(filteredItems, null, 4));
    //alert('Successfull filtering')
    setProductsToContext([...filteredItems]);
  } else {
    setProductsToContext([...items]);
  }
}
