import React, { useState } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import Header from '../genericComponents/Header'
import Source from '../genericComponents/Source'
import RegularListItem from './RegularListItem'
import PersonListItem from './PersonListItem'

import '../Box.scss'
import './List.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  image: PropTypes.node,
  source: PropTypes.string,
  color: PropTypes.string,
  sourceLink: PropTypes.string,
  type: PropTypes.string.isRequired,
  navigateToEntity: PropTypes.func.isRequired,
}
const defaultProps = {
  image: null,
  source: null,
  color: null,
  sourceLink: null,
}

const SearchWrapper = posed.div({
  hide: { height: 0 },
  show: { height: 'auto' },
})

const List = ({
  title, image, color, list, type, source, navigateToEntity, sourceLink,
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

    setList(newFilteredList)
  }

  const renderListItem = (item, i) => {
    switch (type) {
      case 'lista_pessoa':
        return (
          <PersonListItem
            key={item.id}
            data={item.details}
            name={item.dado}
            photo={item.imagem}
            photoLink={item.linkimagem}
            externalLink={item.link_externo}
            internalLink={
              item.entidade_interna && item.id_interna
                ? { entidade: item.entidade_interna, id: item.id_interna }
                : null
            }
            navigateToEntity={navigateToEntity}
          />
        )
      // OrderedList
      // UnorderedList
      // FilterableList
      default:
        return (
          <RegularListItem
            ordered={type === 'lista_ordenada'}
            position={i}
            label={item.rotulo}
            data={item.dado}
            externalLink={item.link_externo}
            internalLink={
              item.entidade_interna && item.id_interna
                ? { entidade: item.entidade_interna, id: item.id_interna }
                : null
            }
            navigateToEntity={navigateToEntity}
          />
        )
    }
  }

  const listCount = () => {
    if (!list || list.length === 1) {
      return null
    }
    if (isNaN(list[0].dado)) {
      return ` (${list.length})`
    }
    return ` (${list
      .map(item => Number(item.dado))
      .reduce((a, b) => a + b, 0)
      .toLocaleString('pt-br')})`
  }

  return (
    <div className="box List">
      <Header
        title={title}
        total={listCount()}
        image={list.length > 1 ? image : null}
        color={color}
        onSearchPressed={list.length > 1 ? () => setSearchStatus(!searchStatus) : null}
      />
      <SearchWrapper
        pose={searchStatus ? 'show' : 'hide'}
        className="List--filter"
        style={color && { backgroundColor: color }}
      >
        <input className="List--input" placeholder="Pesquise" onChange={handleFiltering} />
      </SearchWrapper>
      <ol className="List--container">
        {filteredList.map((item, i) => (
          <li className="List--item" key={item.id}>
            {renderListItem(item, i)}
          </li>
        ))}
      </ol>
      {source && <Source link={sourceLink} text={source} color={color} />}
    </div>
  )
}

List.propTypes = propTypes
List.defaultProps = defaultProps
export default List
