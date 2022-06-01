export const transformOptionValue = (option, label) => {
    if (option === 'Whole body') {
        option = 'wholeBody';
    };
    if (option === 'Face') {
        option = 'face';
    };
    if (option === 'Hair') {
        option = 'hair';
    };
    if (option === 'Hands') {
        option = 'hands';
    };
    if (label === 'Care about') {
        label = 'careAbout';
    };
    if (label === 'Products') {
        label = 'productType';
    };
    if (label === 'Skin type') {
        label = 'skinType';
    };
    if (label === 'Brands') {
        label = 'brand';
    };

    return [option, label];
};

export const checkboxIsCheckedHandler = (filterCheckedValues, setFilterCheckedValues) => (e) => {
    if (e.target.checked) {
        setFilterCheckedValues([...filterCheckedValues, { [e.target.dataset.label]: e.target.defaultValue }]);
    } else {
        let objectToRemove = { [e.target.dataset.label]: e.target.defaultValue };
        let objectKey = e.target.dataset.label;
        setFilterCheckedValues(filterCheckedValues.filter((value) => value[objectKey] !== objectToRemove[objectKey]));
    };
};