import React from 'react'
import PropTypes from 'prop-types'

import Api from '../api/Api'
import Box from '../contents/Box'
import HeaderBox from '../contents/HeaderBox'

import './Modal.scss'

const propTypes = {
  closeModal: PropTypes.func,
  modalInfo: PropTypes.shape({
    boxData: PropTypes.object,
    boxDetailsArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    entityId: PropTypes.string,
    entityType: PropTypes.string,
  }),
  modalOpen: PropTypes.bool,
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: [] }
    this.renderDetail = this.renderDetail.bind(this)
  }

  componentDidUpdate(prevProps) {
    const currentModalInfo = JSON.stringify(this.props.modalInfo)
    const previousModalInfo = JSON.stringify(prevProps.modalInfo)
    const currentModalOpen = this.props.modalOpen
    const previousModalOpen = prevProps.modalOpen

    if (currentModalInfo !== previousModalInfo || currentModalOpen !== previousModalOpen) {
      if (this.props.modalInfo && this.props.modalInfo.boxDetailsArray) {
        const content = this.props.modalInfo.boxDetailsArray.map(box => ({
          id: box.id,
          data_type: 'loading',
        }))
        this.setState({ content })
        this.loadDetailsData(this.props.modalInfo.boxDetailsArray)
      }
    }
  }

  loadDetailsData(dataList) {
    dataList.forEach(detail => Api.getDetailData(
      this.renderDetail,
      this.props.modalInfo.entityType,
      this.props.modalInfo.entityId,
      detail.id,
    ))
  }

  renderDetail(updatedDetail, detailId) {
    const { content } = this.state
    let newContent
    if (detailId) {
      newContent = content.filter(detail => detail.id !== detailId)
    } else {
      newContent = content.map((detail) => {
        if (detail.id === updatedDetail.id) return updatedDetail

        return detail
      })
    }

    this.setState({ content: newContent })
  }

  render() {
    const { closeModal, modalInfo, modalOpen } = this.props
    const { content } = this.state
    const originalBox = (modalInfo && modalInfo.boxData) ? modalInfo.boxData.external_data : null

    const title = (modalInfo && modalInfo.boxData) ? modalInfo.boxData.exibition_field : null

    if (!modalOpen) {
      return null
    }

    return (
      <div className="modal">
        <div className="modal--content">
          <div className="modal--originalBox">
            <HeaderBox
              title={title}
              value={originalBox.dado}
              description={originalBox.details}
              source={originalBox.source}
            />
          </div>
          {content && (
            <div className="modal--content--wrapper">
              {content.map(detail => (
                <Box key={detail.id} content={detail} />
              ))}
            </div>
          )}
        </div>
        <button className="modal--close" onClick={closeModal}>
          <img
            className="modal--icon"
            src={require('../icons/btn_fechar.svg')}
            alt="Identidade visual do botão para fechar o modal"
          />
        </button>
      </div>
    )
  }
}

Modal.propTypes = propTypes
export default Modal
