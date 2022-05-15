import { app, auth, database, storage} from '../firebase';
import { getDatabase, set, ref as databaseRef } from "firebase/database";
import {  ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 } from 'uuid';
  


export function writeProductData(name, description, imageUrl, price, brand, careType, productType, skinType) {
  console.log('in func writeProductData')
  console.log(name)
  console.log(description)
  console.log(imageUrl)
  console.log(price)
  console.log(brand)
  console.log(careType)
  console.log(productType)
  console.log(skinType)
  set(databaseRef(database, 'products/' + name + v4()), {
    name,
    description,
    imageUrl,
    price,
    brand,
    careType,
    productType,
    skinType
  });
};

export const uploadImageHandler = (imageUrl, setImageUrl, setIsUploaded) => (e) => {
  e.preventDefault();
//console.log('prevented');

  if (imageUrl == null) {
    return;
  }

  const imageRef = ref(storage, `images/${imageUrl.name + v4()}`)
//console.log('imageRef:' + imageRef);
 
uploadBytes(imageRef, imageUrl)
    .then((response) => {
      alert('image Uploaded');

      let metadata = Object.values(response);

      let imageName = metadata[0].name;

      getDownloadURL(ref(storage, `/images/${imageName}`))
        .then((url) => {
         // console.log(`url ${url}`)

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
  //console.log('prevented');
  const { name, description, price, brand, careType, productType, skinType } = Object.fromEntries(new FormData(e.currentTarget));
  //console.log('ímageUrl: ' + imageUrl);
  
  if  (imageUrl) {
   // console.log('Name: ' + name)
    writeProductData(name, description, imageUrl, price, brand, careType, productType, skinType);
    alert('Successful writing of product data');
    e.currentTarget.reset();
    console.log('Form reseted');
    setIsUploaded(false);
  } else {
    alert('Error: Couldn\'t save data')
  }
   
  
};