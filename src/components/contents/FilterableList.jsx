import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'
import './Lists.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string }))
    .isRequired,
  source: PropTypes.string,
  color: PropTypes.string,
  navigateToEntity: PropTypes.func,
}

const defaultProps = {
  source: null,
  color: null,
  navigateToEntity: null,
}

class FilterableList extends React.Component {
  componentWillMount() {
    const { list } = this.props
    this.setState({ filteredList: list })
  }

  clickToFeature = (event, item, callback) => {
    if (item && item.entidade_interna && item.id_interna) {
      callback(item.entidade_interna, item.id_interna)
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
      filteredList = filteredList.filter((item) => {
        const filterStr = item.rotulo ? item.rotulo : item.dado
        return this.lowerCaseNoDiacritics(filterStr).includes(this.lowerCaseNoDiacritics(value))
      })
    }
    this.setState({ filteredList })
  }

  render() {
    const {
      title, source, navigateToEntity, color,
    } = this.props
    const { filteredList } = this.state
    return (
      <div className="box list-box list-box-filterable">
        <div className="list-box-filterable--header" style={color && { backgroundColor: color }}>
          {title ? <div className="list-box-filterable--title">{title}</div> : null}
          <input
            className="list-box-filterable--input"
            placeholder="Digite aqui para filtrar"
            onChange={this.handleFiltering}
          />
        </div>
        <div className="list-box-container">
          <ol className="list-box--list">
            {filteredList.map((itemList, index) => (
              <li
                key={`${index}`}
                className="list-box--list-item"
                onClick={event => this.clickToFeature(event, itemList, navigateToEntity)}
              >
                {itemList.rotulo ? (
                  <div className="list-box--list-item-label">{itemList.rotulo}</div>
                ) : null}
                {itemList.dado ? (
                  <div className="list-box--list-item-value">
                    {isNaN(itemList.dado)
                      ? itemList.dado
                      : Number(itemList.dado).toLocaleString('pt-br')}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        {source ? (
          <div className="list-box--source" style={color && { backgroundColor: color }}>
            {source}
          </div>
        ) : null}
      </div>
    )
  }
}

FilterableList.propTypes = propTypes
FilterableList.defaultProps = defaultProps
export default FilterableList
