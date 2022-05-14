import React from 'react';
import { object, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SideNavigationLink.css';

const SideNavigationMenu = (props) => {
    const { title, icon } = props;

    return (
        <a className="sidebar-link" href="#">
            {icon && <FontAwesomeIcon icon={icon} />}
            {title}
        </a>
    )
};

SideNavigationMenu.propTypes = {
    bodyCareType: string.isRequired,
    icon: object,
}

SideNavigationMenu.defaultProps = {
    icon: null,
}

export default SideNavigationMenu;