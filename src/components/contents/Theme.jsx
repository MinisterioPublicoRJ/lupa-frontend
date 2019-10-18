import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import Api from '../api/Api'
import Box from './Box'
import './Theme.scss'

const propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  navigateToEntity: PropTypes.func.isRequired,
}

const defaultProps = {
  color: null,
  name: null,
}

const ContentWrapper = (
  posed.div({
    closed: { height: 0 },
    open: { height: 'auto', staggerChildren: 100 },
  })
)

class Theme extends React.Component {
  constructor(props) {
    super(props)
    const content = props.content.map(box => ({ id: box.id, data_type: 'loading' }))
    this.state = { open: !props.name, content }
    this.renderBox = this.renderBox.bind(this)
    this.loadBoxes(props.content)
  }

  handleToggle() {
    this.setState(prevState => ({ open: !prevState.open }))
  }

  /**
   * Creates promises to get the boxes' content from the database
   * @param  {array} dataList Array of jsons with the boxes id's
   * @return {void}
   */
  loadBoxes(dataList) {
    const { entityType, entityId } = this.props
    dataList.forEach(item => Api.getBoxData(this.renderBox, entityType, entityId, item.id))
  }

  /**
   * Callback from the getBoxData function
   * Receives the box info after the promise is resolved
   * and updates the state with the new data
   * @param  {json} updatedBox actual box content
   * @param  {string} boxId    id (only comes if the request fails)
   * @return {void}
   */
  renderBox(updatedBox, boxId) {
    const { content } = this.state
    let newContent
    if (boxId) {
      newContent = content.filter(box => box.id !== boxId)
    } else {
      newContent = content.map((box) => {
        if (box.id === updatedBox.id) return updatedBox

        return box
      })
    }

    this.setState({ content: newContent })
  }

  render() {
    const { content, open } = this.state
    const { color, navigateToEntity, name } = this.props
    const themeStatus = open ? 'open' : 'closed'

    return (
      <div className="theme">
        {name ? (
          <div
            className={`theme--header ${themeStatus}`}
            onClick={() => this.handleToggle()}
            style={{ backgroundColor: color, borderColor: color }}
          >
            <h3 className={`theme--header--title ${themeStatus}`} >
              {name.toLocaleUpperCase()}
            </h3>
            <small className={`theme--header--count ${themeStatus}`}>
              {`${content.length} Tema`}
              {content.length > 1 ? 's' : ''}
            </small>
          </div>
        ) : null}
        {content ? (
          <ContentWrapper className="theme--content" pose={themeStatus}>
            {content.map(box => (
              <Box key={box.id} content={box} color={color} navigateToEntity={navigateToEntity} />
            ))}
          </ContentWrapper>
        ) : null}
      </div>
    )
  }
}

Theme.propTypes = propTypes
Theme.defaultProps = defaultProps
export default Theme
