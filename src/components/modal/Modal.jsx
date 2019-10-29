import React from 'react'
import PropTypes from 'prop-types'

import Api from '../api/Api'
import Box from '../contents/Box'

import './Modal.scss'

const propTypes = {
  modalInfo: PropTypes.shape({
    boxData: PropTypes.object,
    boxDetailsArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
    entityId: PropTypes.string,
    entityType: PropTypes.string,
  }),
  modalOpen: PropTypes.bool,
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: []}
    this.renderDetail = this.renderDetail.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidUpdate(prevProps) {
    let currentModalInfo = JSON.stringify(this.props.modalInfo)
    let previousModalInfo = JSON.stringify(prevProps.modalInfo)
    let currentModalOpen = this.props.modalOpen
    let previousModalOpen = prevProps.modalOpen
    
    if (currentModalInfo !== previousModalInfo || currentModalOpen !== previousModalOpen) {
      if (this.props.modalInfo && this.props.modalInfo.boxDetailsArray) {
        let content = this.props.modalInfo.boxDetailsArray.map(box => ({ id: box.id, data_type: 'loading' }))
        this.setState({content})
        this.loadDetailsData(this.props.modalInfo.boxDetailsArray)  
      }
    }


  }

  loadDetailsData(dataList) {
    dataList.forEach(
      detail => Api.getDetailData(
        this.renderDetail,
        this.props.modalInfo.entityType,
        this.props.modalInfo.entityId,
        detail.id
      )
    )
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

  closeModal() {
    this.setState({ modalOpen: false })
  }

  render() {
    const { modalInfo, modalOpen } = this.props
    const { content } = this.state

    console.log('Modal', modalOpen, modalInfo)

    if (!modalOpen) {
      return null
    }

    return (
      <div className="modal">
        <div className="modal--content">
          <h3 className="modal--title">Título</h3>
          <p>(falta repetir a caixa de fora aqui novamente)</p>
          {content ? content.map(detail => <Box key={detail.id} content={detail} />) : null}
        </div>
        <button
          className="modal--close"
          onClick={this.closeModal}
        >
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