import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './Lists.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string }))
    .isRequired,
  source: PropTypes.string,
}

const defaultProps = {
  source: null,
}

class FilterableList extends React.Component {
  componentWillMount() {
    this.setState({ filteredList: this.props.list })
  }

  clickToFeature = (event, item, callback) => {
    if (item && item.link_interno_entidade && item.link_interno_id) {
      callback(item.link_interno_entidade, item.link_interno_id)
    }
  }

  lowerCaseNoDiacritics = str => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  handleFiltering = (e) => {
    const { value } = e.target
    let filteredList = this.props.list
    if (value) {
      filteredList = filteredList.filter(item => this.lowerCaseNoDiacritics(item.dado).includes(this.lowerCaseNoDiacritics(value)))
    }
    this.setState({ filteredList })
  }

  render() {
    const { title, source, navigateToEntity } = this.props
    const { filteredList } = this.state
    return (
      <div className="box list-box list-box-filterable">
        <div className="list-box-filterable--header">
          {title ? <div className="list-box-filterable--title">{title}</div> : null}
          <input
            className="list-box-filterable--input"
            placeholder="Digite aqui para filtrar"
            onChange={this.handleFiltering}
          />
        </div>
        <div className="list-box-container">
          <ol className="list-box--list">
            {filteredList.map(itemList => (
              <li
                key={`${itemList.label}-${itemList.dado}`}
                className="list-box--list-item"
                onClick={event => this.clickToFeature(event, itemList, navigateToEntity)}
              >
                {itemList.label ? (
                  <div className="list-box--list-item-label">{itemList.label}</div>
                ) : null}
                {itemList.dado ? (
                  <div className="list-box--list-item-value">{itemList.dado}</div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        {source ? <div className="list-box--source">{source}</div> : null}
      </div>
    )
  }
}

FilterableList.propTypes = propTypes
FilterableList.defaultProps = defaultProps
export default FilterableList
