import { database, storage } from '../firebase';
import { set, ref as databaseRef, onValue, update, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';

export function writeProductData(name, description, imageUrl, imageName, price, brand, careAbout, productType, skinType) {
    const id = v4();

    set(databaseRef(database, 'products/' + id), {
        id,
        name,
        description,
        imageUrl,
        imageName,
        price,
        brand,
        careAbout,
        productType,
        skinType
    });
};

export const uploadImage = (imageUrl, setImageUrl, setImageName, setIsUploaded) => {
    if (imageUrl == null) {
        return;
    };

    const imageId = v4();

    const imageRef = storageRef(storage, `images/${imageId}`);

    uploadBytes(imageRef, imageUrl)
        .then((response) => {
            alert('image Uploaded');

            let metadata = Object.values(response);
            console.log('metadata: ' + metadata);
            console.log('metadata: ' + JSON.stringify(metadata));

            let imageName = metadata[0].name;
            setImageName(imageName);

            console.log('imageId from metadata: ' + JSON.stringify(imageId));
            console.log('imageName from metadata: ' + JSON.stringify(imageName));


            getDownloadURL(storageRef(storage, `/images/${imageName}`))
                .then((url) => {
                    console.log('imageUrl in getDownloadUrl: ' + url);
                    setImageUrl(url);
                    setIsUploaded(true)
                });
        })
        .catch((error) => {
            alert(error);
        });
};

export const createProduct = (imageUrl, setIsUploaded, setImageUrl, imageName, setImageName, name, description, price, brand, careAbout, productType, skinType) => {
    try {
        writeProductData(name, description, imageUrl, imageName, price, brand, careAbout, productType, skinType);
        alert('Successful writing of product data');

        setImageName(null);
        setImageUrl(null);
        setIsUploaded(false);
    } catch (error) {
        alert(error)
    };
};


export const getAll = (reference, setProductsToContext, setProductsToAnotherContext) => {
    let productsArray = [];

    onValue(databaseRef(database, reference), (snapshot) => {
        const productsData = snapshot.val();

        if (productsData) {
            Object.values(productsData).map((product) => {
                productsArray = [...productsArray, product];
            });

            if (productsArray) {
                setProductsToContext([...productsArray]);
                if (setProductsToAnotherContext) {
                    setProductsToAnotherContext([...productsArray]);
                }
            } else {
                console.log('There are no products to display')
            };
        };
    });

    return productsArray;
};

export const filterItemsByCheckboxCriteria = async (items, filterCheckedValues, setProductsToContext) => {
    let filteredProducts = [];

    if (filterCheckedValues.length === 0) {
        await setProductsToContext([...items]);
    } else {
        filterCheckedValues.map((filterValue) => {
            console.log(222, filterValue);
            let key = Object.keys(filterValue);

            items.filter((item) => {
                if (item[key].toLowerCase() === filterValue[key].toLowerCase() && filteredProducts.every((product) => product.id !== item.id)) {
                    filteredProducts = [...filteredProducts, item];
                };
            });
        });

        alert('Successfull filtering')
        await setProductsToContext([...filteredProducts]);
    };
};

export const searchItems = (items, searchedValue, setProductsToContext) => {
    console.log(searchedValue);
    let filteredItems = [];

    if (searchedValue) {
        items.map((item) => {
            Object.values(item).map((itemValue) => {
                let value = itemValue.toString().toLowerCase();
                if (value.includes(searchedValue.toLowerCase()) && filteredItems.every((product) => product.id !== item.id)) {
                    filteredItems = [...filteredItems, item];
                };
            });
        });

        setProductsToContext([...filteredItems]);
    } else {
        setProductsToContext([...items]);
    };
};

export const totalPriceCalculation = (orderedProducts = [], setTotalPrice) => {
    let totalPriceOfOrders = 0;

    console.log('orderedProducts in poroductService: ' + orderedProducts);

    orderedProducts.map((product) => {
        totalPriceOfOrders += (Number(product.price) * Number(product.quantity));
    });
    console.log('totalPriceOfOrders in porductService: ' + totalPriceOfOrders);

    setTotalPrice(totalPriceOfOrders.toFixed(2));
};

export const saveNewOrder = async (user, orderedProducts, setOrderedProducts, totalPrice, currentStatus) => {
    const id = v4();

    try {
        const response = await set(databaseRef(database, 'orders/' + id), {
            id,
            user,
            orderedProducts,
            totalPrice,
            status: currentStatus
        });

        await setOrderedProducts([]);
        localStorage.removeItem('orderedProducts');
        alert('Your order is sent successfully');
    } catch (error) {
        alert(`${error.code}: ${error.message}`);
    };
};

export const updateOrderStatus = async (itemId, newStatus) => {
    await update(databaseRef(database, 'orders/' + itemId), {
        ['status']: newStatus,
    });
};

export const editProduct = async (itemId, editedName, editedDescription, editedPrice, editedBrand, editedCareAbout, editedProductType, editedSkinType, imageUrl) => {
    try {
        await update(databaseRef(database, 'products/' + itemId), {
            ['name']: editedName,
            ['description']: editedDescription,
            ['imageUrl']: imageUrl,
            ['price']: editedPrice,
            ['brand']: editedBrand,
            ['careAbout']: editedCareAbout,
            ['productType']: editedProductType,
            ['skinType']: editedSkinType
        });

        alert(`Product is edited successfully`);
    } catch (error) {
        alert(`${error.code}: ${error.message}`);
    }
};

export const deleteItemFromServer = async (itemId, databaseReference, imageName, storageReference) => {
    try {    
        let responseFromDatabase = await remove(databaseRef(database, databaseReference + itemId)); 

        if (imageName && storageReference) {
            let responseFromStorage = await deleteObject(storageRef(storage, storageReference + imageName)); 

            return [responseFromDatabase, responseFromStorage];
        };
        
        return responseFromDatabase;
    } catch (error) {
        alert(`${error.code}: ${error.message}`);
    }
};