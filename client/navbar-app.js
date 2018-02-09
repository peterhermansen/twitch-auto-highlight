import React from 'react'
import SearchApp from './search-app'
import SidebarApp from './sidebar-app'

export default function NavbarApp() {
  return (
    <div id="navbar-div">
      <button id="navbar-menu" className="ui icon button">
        <i id="navbar-menu-icon" className="large sidebar icon"/>
      </button>
      <h1 id="navbar-title">TWITCH AUTO-HIGHLIGHT</h1>
      <SearchApp />
      <SidebarApp />
    </div>
  )
}
