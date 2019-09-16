import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChalkboardTeacher, faTimes, faHome } from '@fortawesome/free-solid-svg-icons'

import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu'

const Menu = ({ isOpen, toggle, login, navigateToEntity }) => {
  const FaButtons = ({ type }) => <FontAwesomeIcon icon={type} />
  return (
    <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={isOpen}>
      <MainButton
        iconResting={<FaButtons type={faBars} />}
        iconActive={<FaButtons type={faTimes} />}
        backgroundColor="black"
        onClick={() => toggle(!isOpen)}
        size={56}
      />
      <ChildButton
        icon={<FaButtons type={faChalkboardTeacher} />}
        backgroundColor="white"
        size={40}
        onClick={login}
      />
      <ChildButton
        icon={<FaButtons type={faHome} />}
        backgroundColor="white"
        size={40}
        onClick={navigateToEntity}
      />
    </FloatingMenu>
  )
}

export default Menu
