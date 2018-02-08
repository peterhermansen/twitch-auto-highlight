import React from 'react'

export default class NavbarApp extends React.Component {
  render() {
    return (
      <div id="navbar">
        <button id="navbar-menu" className="ui icon button">
          <i id="navbar-menu-icon" className="large sidebar icon"/>
        </button>
        <h1 id="navbar-title">TWITCH AUTO-HIGHLIGHT</h1>
      </div>
    )
  }
}
