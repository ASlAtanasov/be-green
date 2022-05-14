import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string, arrayOf, object } from "prop-types";

import "./MenuWithToggle.css";

const MenuWithToggle = (props) => {
    const { label, options, icon } = props;
    const [expanded, setExpanded] = useState(false);

    const onClick = () => setExpanded(!expanded);

    return (
        <div>
            <button type="button" className="sidebar-link" onClick={onClick}>
                {icon && <FontAwesomeIcon icon={icon} />}
                <span>{label}</span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" className={`svg-inline--fa fa-sort-down filter-arrow ${expanded ? 'filter-arrow-up' : ''}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"></path>
                </svg>
            </button>
            <div className={`filter-collapse ${expanded ? 'filter-collapse-active' : ''}`} >
                <div className="collapse__content collapse__content--collapsed">
                    <div>
                        <ul className="filter-section-list">

                            {
                                options.map((option, idx) => (
                                    <li key={option} className="">
                                        <span className="checkbox">
                                            <input type="checkbox" id={option} className="is-sr-only" />
                                            <label htmlFor={option}>
                                                {option}
                                            </label>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

MenuWithToggle.propTypes = {
    label: string.isRequired,
    options: arrayOf(string).isRequired,
    icon: object,
};

MenuWithToggle.defaultProps = {
    icon: null,
};

export default MenuWithToggle;