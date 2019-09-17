import React from 'react'
import posed from 'react-pose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars, faChalkboardTeacher, faTimes, faHome,
} from '@fortawesome/free-solid-svg-icons'
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu'

import './Menu.scss'

const Menu = ({
  isOpen, toggle, login, navigateToEntity,
}) => {
  const FaButtons = ({ type }) => <FontAwesomeIcon icon={type} className="icons" />
// let isMoving
  return (
    <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={isOpen} className="outerMenu">
      <MainButton
        className="mainButton"
        iconResting={<FaButtons type={faBars} />}
        iconActive={<FaButtons type={faTimes} />}
        background="#00A5FD"
        onClick={(event) => { console.log('click', event.movementX, event.movementY, event); toggle(!isOpen) }}
        size={56}
      />
      <ChildButton
        icon={<FaButtons type={faChalkboardTeacher} />}
        background="#00A5FD"
        size={40}
        onClick={login}
      />
      <ChildButton
        icon={<FaButtons type={faHome} />}
        background="#00A5FD"
        size={40}
        onClick={navigateToEntity}
      />
    </FloatingMenu>
  )
}

const WrapperDiv = posed.div({ draggable: true })

const WrappedMenu = props => (
  <WrapperDiv className="wrapper">
    <Menu {...props} />
  </WrapperDiv>
)

export default WrappedMenu
