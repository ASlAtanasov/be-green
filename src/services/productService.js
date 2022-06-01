import { database, storage } from '../firebase';
import { set, ref as databaseRef, onValue, update, remove } from "firebase/database";
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

export const uploadImage = (imageUrl, setImageUrl, setIsUploaded) => (e) => {
    e.preventDefault();

    if (imageUrl == null) {
        return;
    };

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

export const createProduct = (imageUrl, setIsUploaded, setImageUrl) => (e) => {
    e.preventDefault();

    const { name, description, price, brand, careAbout, productType, skinType } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        writeProductData(name, description, imageUrl, price, brand, careAbout, productType, skinType);
        alert('Successful writing of product data');

        e.currentTarget.reset();
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

export const deleteItemFromServer = async (itemId) => {
    let response = await remove(databaseRef(database, 'orders/' + itemId));
    console.log('response in deleteItem: ' + response);
    console.log('response in deleteItem: ' + JSON.stringify(response));
    return response;
};