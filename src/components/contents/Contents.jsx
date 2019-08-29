import React from 'react'
import PropTypes from 'prop-types'

import Theme from './Theme'
import './Contents.scss'
import EntityError from '../utils/EntityError'

const propTypes = {
  themes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  error: PropTypes.bool,
  navigateToEntity: PropTypes.func,
}

const defaultProps = {
  error: false,
  navigateToEntity: null,
}

const Contents = ({ themes, error, navigateToEntity, entityType, entityId }) => (
  <div className="contents">
    {error ? <EntityError errorInfo={error} /> : null}
    {themes
      ? themes.map((item, i) => (
        <Theme
          key={`item.tema${i}`}
          content={item.data_list}
          color={item.cor}
          name={item.tema}
          entityType={entityType}
          entityId={entityId}
          navigateToEntity={navigateToEntity}
        />
      ))
      : null}
  </div>
)

Contents.propTypes = propTypes
Contents.defaultProps = defaultProps
export default Contents
