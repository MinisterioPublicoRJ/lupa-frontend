import React from 'react'
import PropTypes from 'prop-types'

import './Box.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string }))
    .isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
}

class FilterableList extends React.Component {
  handleFiltering = e => {
    const value = e.target.value
    let filteredList = this.props.list
    if (value) {
      this.setState({
        filteredList: filteredList.filter(
          item => item.dado
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              value
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
            )
          )
      })
    } else {
      this.setState({filteredList})
    }
  }

  componentWillMount(){
    this.setState({ filteredList: this.props.list })
  }

  render() {
    const { title, source, list, image } = this.props
    const { filteredList } = this.state
    return (
      <div className="box list-box list-box-filterable">
        <div className="list-box--header">
          {title ? <h1 className="list-box--title">{title}</h1> : null}
          {image ? <img src={image} alt="" className="list-box--icon" /> : null}
        </div>
        <input className="list-box-filterable--input" placeholder="🔍 Digite aqui para filtrar" onChange={this.handleFiltering}/>
        <div className="list-box-container">
          <ol className="list-box--list">
            {filteredList.map(itemList => (
              <li key={`${itemList.label}-${itemList.dado}`} className="list-box--list-item">
                {itemList.label ? (
                  <div className="list-box--list-item-label">{itemList.label}</div>
                ) : null}
                {itemList.dado ? <div className="list-box--list-item-value">{itemList.dado}</div> : null}
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
export default FilterableList
