export const transformOptionValue = (option, label) => {
    if (option === 'Whole body') {
        option = 'wholeBody';
    }
    if (option === 'Face') {
        option = 'face';
    }
    if (option === 'Hair') {
        option = 'hair';
    }
    if (option === 'Hands') {
        option = 'hands';
    }
    if (label === 'Care about') {
        label = 'careAbout';
    }
    if (label === 'Products') {
        label = 'productType';
    }
    if (label === 'Skin type') {
        label = 'skinType';
    }
    if (label === 'Brands') {
        label = 'brand';
    }
    return [option, label];
};

export const checkboxIsCheckedHandler = (filterCheckedValues, setFilterCheckedValues) => (e) => {
    //let newFilterArray = [];
    
    if (e.target.checked) {
       // newFilterArray.push({[e.target.dataset.label]: e.target.defaultValue})
        setFilterCheckedValues([...filterCheckedValues, {[e.target.dataset.label]: e.target.defaultValue}]);
        console.log(filterCheckedValues);
    } else {
        let objectToRemove = {[e.target.dataset.label]: e.target.defaultValue};
        let objectKey = e.target.dataset.label;
        setFilterCheckedValues(filterCheckedValues.filter((value) => value[objectKey] !== objectToRemove[objectKey]));
        console.log(filterCheckedValues);
    };
};