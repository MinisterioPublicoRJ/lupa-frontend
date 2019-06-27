import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.scss';

const propTypes = {
  menuPressed: PropTypes.func.isRequired,
  searchPressed: PropTypes.func.isRequired,
}

function search(props) {
  const text = 'Pesquise Municípios, Prédios e Órgãos';
  return (
    <div className="Search-container">
      <div className="Search-view">
        <div className="Search-button">
          <FontAwesomeIcon
            className="Search-icon"
            icon={faBars}
            onClick={() => props.menuPressed()}
          />
        </div>
        <input className="Search-input" placeholder={text} />
        <div className="Search-button">
          <FontAwesomeIcon
            className="Search-icon"
            icon={faSearch}
            onClick={() => props.searchPressed()}
          />
        </div>
      </div>
    </div>
  );
}
search.propTypes = propTypes;

export default search;
