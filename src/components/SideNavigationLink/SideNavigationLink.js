import React, { useState } from 'react';
import { object, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformOptionValue } from '../../services/commonServices';
import { useFilterContext } from '../../contexts/FilterContext';
import { useProductsContext } from '../../contexts/ProductsContext';
import { getAll, filterItemsByCheckboxCriteria, searchItems } from '../../services/productService';

import './SideNavigationLink.css';

const SideNavigationMenu = (props) => {
    const { title, icon } = props;
    // let { filterCheckedValues, setFilterCheckedValues } = useFilterContext();

    // const [filterValues, setFilterValues] = useState([])
    // const { products, setProducts, productsToDisplay, setProductsToDisplay } = useProductsContext();

    // const onClickBodyCareHandler = (title) => async (e) => {
    //     e.preventDefault();
    //     console.log('option received: ' + title);

    //     const [option, label] = transformOptionValue(title, 'careAbout');
    //     console.log('label: ' + label);
    //     console.log('option: ' + option);

    //    await setFilterCheckedValues([{ [label]: option }])
        
    //     //console.log('filterCheckedValues: ' + filterCheckedValues);
    //     // setFilterValues([{ [label]: option }])
    //     console.log('filterValues: ' + filterValues);

    //     await filterItemsByCheckboxCriteria(products, filterCheckedValues, setProductsToDisplay)
    // }

    // useEffect(() => {
    //     filterItemsByCheckboxCriteria(products, filterCheckedValues, setProductsToDisplay)
    // }, [filterCheckedValues]);

    return (
        <a className="sidebar-link" href="#" onClick={props.onClick}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {title}
        </a>
    )
};

SideNavigationMenu.propTypes = {
    title: string.isRequired,
    icon: object,
}

SideNavigationMenu.defaultProps = {
    icon: null,
}

export default SideNavigationMenu;