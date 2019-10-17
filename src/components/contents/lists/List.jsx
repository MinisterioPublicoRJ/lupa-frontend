import React, { useState } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import Header from '../genericComponents/Header'

import '../Box.scss'
import './List.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, dado: PropTypes.string }))
    .isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
  color: PropTypes.string,
  navigateToEntity: PropTypes.func.isRequired,
}
const defaultProps = {
  image: null,
  source: null,
  color: null,
}

const SearchWrapper = posed.div({
  hide: { height: 0 },
  show: { height: 'auto' },
})

const List = ({
  title, image, color, list,
}) => {
  const [filteredList, setList] = useState(list)
  const [searchStatus, setSearchStatus] = useState(false)

  const lowerCaseNoDiacritics = str => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const handleFiltering = (e) => {
    const { value } = e.target
    let newFilteredList = list
    if (value) {
      newFilteredList = newFilteredList.filter((item) => {
        let filterStr
        if (item.rotulo) {
          filterStr = item.rotulo
        } else {
          filterStr = item.dado ? item.dado : 'erro de cadastro?'
        }
        return lowerCaseNoDiacritics(filterStr).includes(lowerCaseNoDiacritics(value))
      })
    }

    setList({ newFilteredList })
  }

  return (
    <div className="box List">
      <Header
        title={title}
        image={image}
        color={color}
        onSearchPressed={() => setSearchStatus(!searchStatus)}
      />
      <SearchWrapper
        pose={searchStatus ? 'show' : 'hide'}
        className="List--filter"
        style={color && { backgroundColor: color }}
      >
        <input className="List--input" placeholder="Pesquise" onChange={handleFiltering} />
      </SearchWrapper>
      Teste
    </div>
  )
}

List.propTypes = propTypes
List.defaultProps = defaultProps
export default List
