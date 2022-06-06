import React, { useState } from "react";
import './Create.css';
import { uploadImage, createProduct } from '../../services/productService';

const Create = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [category, setCategory] = useState('body');;


    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const { name, description, price, brand, careAbout, productType, skinType } = Object.fromEntries(new FormData(e.currentTarget));
        createProduct(imageUrl, setIsUploaded, setImageUrl, imageName, setImageName, name, description, price, brand, careAbout, productType, skinType);
        e.currentTarget.reset();
    };

    const uploadImageHandler = (e) => {
        e.preventDefault();
        uploadImage(imageUrl, setImageUrl, setImageName, setIsUploaded);
    };

    const onChangeSetCategoryHandler = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        console.log(e.target.value);
        console.log(category);
    };

    const foodsFields = (
        <><p className="field create-section-form-fieldset-p-careAbout">
            <label htmlFor="careAbout">Care type:</label>
            <span className="input">
                <select id="careAbout" name="careAbout">
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
                        <option value="mask">Mask</option>
                        <option value="oil">Oil</option>
                        <option value="shampoo">Shampoo</option>
                        <option value="wash">Wash</option>
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
        </>
    );

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
                            <section>
                                <input type="file" name="imageFile" id="imageFile" onChange={(e) => setImageUrl(e.currentTarget.files[0])} />
                                {!imageUrl && <span></span>}
                                {imageUrl && !isUploaded && <span className="image-choosen-file-text">{'Image file has been chosen!'}</span>}
                                {imageUrl && isUploaded && <span className="image-choosen-file-text">{'Image file has been uploaded!'}</span>}
                            </section>
                            <button className={`${isUploaded && 'disabled'}`} type="submit" onClick={uploadImageHandler}>Upload to server</button>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-price">
                        <label htmlFor="price">Price:</label>
                        <span className="input">
                            <input type="text" name="price" id="price" placeholder="Price" />
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

                    <p className="field create-section-form-fieldset-p-category">
                        <label htmlFor="category">Category:</label>
                        <span className="input">
                            <select id="category" name="category" onChange={onChangeSetCategoryHandler}>
                                <option value="body">Body</option>
                                <option value="foods">Foods</option>
                                <option value="nature">Nature</option>
                            </select>
                        </span>
                    </p>
                    {category === 'body' && foodsFields}
                    <input className={`button submit create-section-form-fieldset-button ${!isUploaded && 'disabled'}`} type="submit" disabled={!isUploaded} value="Add" />
                </fieldset>
            </form>
        </section>
    )
};

export default Create;