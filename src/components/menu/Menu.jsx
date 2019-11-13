import React from 'react'
import posed from 'react-pose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faChalkboardTeacher,
  faTimes,
  faHome,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu'

import './Menu.scss'

const Menu = ({
  isOpen, toggle, onLogin, onLogout, navigateToEntity, isLogged, scrollToTop
}) => {
  const FaButtons = ({ type, text }) => (
    <div>
      <FontAwesomeIcon icon={type} className="icons" />
      <span className="menuLabels">
        {text}
      </span>
    </div>
  )
  return (
    <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={isOpen} className="outerMenu">
      <MainButton
        className="mainButton"
        iconResting={<FaButtons type={faBars} />}
        iconActive={<FaButtons type={faTimes} />}
        background="#00A5FD"
        onClick={() => toggle(!isOpen)}
        size={56}
      />
      <ChildButton
        icon={<FaButtons type={faChalkboardTeacher} text={isLogged ? 'Logout' : 'Login'} />}
        background="#00A5FD"
        size={40}
        onClick={isLogged ? onLogout : onLogin}
      />
      <ChildButton
        icon={<FaButtons type={faHome} text="Estado" />}
        background="#00A5FD"
        size={40}
        onClick={navigateToEntity}
      />
      <ChildButton
        icon={<FaButtons type={faArrowUp} text="Topo" />}
        background="#00A5FD"
        size={40}
        onClick={() => {toggle(!isOpen); scrollToTop()}}
      />
    </FloatingMenu>
  )
}

const WrapperDiv = posed.div({
  draggable: false,
  init: {
    bottom: '20px', left: '20px', position: 'fixed', scale: 1, zIndex: 500,
  },
  pressable: true,
  press: { scale: 0.8 },
})

const WrappedMenu = props => (
  <WrapperDiv>
    <Menu {...props} />
  </WrapperDiv>
)

export default WrappedMenu
