import {app, auth, storage, database} from '../firebase';
import { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import {v4} from 'uuid';

const db = getDatabase();

export function writeProductData(name, description,imageUrl, price, brand, careType, productType, skinType ) {
  set(ref(db, 'products/' + name + v4()), {
    name, 
    description,
    imageUrl, 
    price,
     brand, 
    careType, 
    productType, 
    skinType 
  });
}