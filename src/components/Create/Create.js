import React from "react";
import './Create.css';

import { app, auth, storage } from '../../firebase';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { writeProductData } from "../../services/productService";

const Create = () => {
    const [imageUrl, setImageUrl] = useState(null)

    const uploadImageHandler = (e) => {
        e.preventDefault();

        if (imageUrl == null) {
            return;
        }

        const imageRef = ref(storage, `images/${imageUrl.name + v4()}`)

        uploadBytes(imageRef, imageUrl)
            .then((response) => {
                console.log(response);
                alert('image Uploaded');
                let metadata = Object.values(response);
                console.log(metadata);
                let imageName = metadata[0].name;
                console.log(`Image name: ${imageName}`)

                getDownloadURL(ref(storage, `/images/${imageName}`))
                    .then((url) => {
                        console.log(`url ${url}`)

                        setImageUrl(url);
                    });

            })
            .catch((error) => {
                alert(error);
            })

        console.log(`setImageUrl 2: ${imageUrl}`);



        // useEffect(() => {

        // }, []);

    };

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const { name, description, price, brand, careType, productType, skinType } = Object.fromEntries(new FormData(e.currentTarget));
        console.log(name)
        console.log(description)
        console.log(imageUrl)
        console.log(price)
        console.log(brand)
        console.log(careType)
        console.log(productType)
        console.log(skinType)
        try {
           writeProductData(name, description, imageUrl, price, brand, careType, productType, skinType);
            console.log('Successful writing of product data');
        } catch (error) {
            alert(error);
        }
    };



    return (
        <section id="create-page" className="create create-section">
            <form id="create-form" className='create-section-form' method="POST" onSubmit={createProductSubmitHandler}>
                <fieldset>
                    <legend>Add new product</legend>
                    <p className="field create-section-form-fieldset-p-name">
                        <label htmlFor="name">Name:</label>
                        <span className="input">
                            <input type="text" name="name" id="name" placeholder="Name" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-description">
                        <label htmlFor="description">Description:</label>
                        <span className="input">
                            <textarea name="description" id="description" placeholder="Description" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-imageFile">
                        <label htmlFor="imageFile">Image file:</label>
                        <span className="input">
                            <input type="file" name="imageFile" id="imageFile" onChange={(e) => setImageUrl(e.currentTarget.files[0])} />
                            <button type="submit" onClick={uploadImageHandler}>Upload to firebase</button>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-price">
                        <label htmlFor="price">Price:</label>
                        <span className="input">
                            <input type="number" name="price" id="price" placeholder="Price" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-brand">
                        <label htmlFor="brand">Brand:</label>
                        <span className="input">
                            <select id="brand" name="brand">
                                <option value="avon">Avon</option>
                                <option value="garnier">Garnier</option>
                                <option value="loreal">Loreal</option>
                                <option value="oriflame">Oriflame</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-careType">
                        <label htmlFor="careType">Care type:</label>
                        <span className="input">
                            <select id="careType" name="careType">
                                <option value="wholeBody">Whole body</option>
                                <option value="face">Face</option>
                                <option value="hair">Hair</option>
                                <option value="hands">Hands</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-productType">
                        <label htmlFor="productType">Product type:</label>
                        <span className="input">
                            <select id="productType" name="productType">
                                <option value="cream">Cream</option>
                                <option value="lotion">Lotion</option>
                                <option value="oil">Oil</option>
                                <option value="shampoo">Shampoo</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-skinType">
                        <label htmlFor="skinType">Skin type:</label>
                        <span className="input">
                            <select id="skinType" name="skinType">
                                <option value="dry">Dry</option>
                                <option value="moist">Moist</option>
                                <option value="normal">Normal</option>
                            </select>
                        </span>
                    </p>
                    <input className="button submit create-section-form-fieldset-button" type="submit" value="Add" />
                </fieldset>
            </form>
        </section>
    )
};

export default Create;