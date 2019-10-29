import React from 'react'
import PropTypes from 'prop-types'

import Api from '../api/Api'

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
    // this.renderDetail = this.renderDetail.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidUpdate() {
    console.log("mudou")
    this.loadDetailsData()
  }

  loadDetailsData() {
    this.props.modalInfo.boxDetailsArray.forEach(
      detail => Api.getDetailData(
        this.renderDetail,
        this.props.modalInfo.entityType,
        this.props.modalInfo.entityId,
        detail.id
      )
    )
  }

  renderDetail(data) {
    console.log(data)
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  render() {
    const { modalInfo, modalOpen } = this.props

    console.log('Modal', modalOpen, modalInfo)

    if (!modalOpen) {
      return null
    }

    return (
      <div className="modal">
        <div className="modal--content">
          <h3 className="modal--title">Título</h3>
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
