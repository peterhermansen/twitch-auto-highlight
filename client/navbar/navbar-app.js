import React from 'react'
import SearchApp from './search-app'
import SidebarApp from './sidebar-app'

export default class NavbarApp extends React.Component {

  constructor() {
    super()
    this.state = {sidebarClassName: ''}

    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick() {
    if (!this.state.sidebarClassName) this.setState({sidebarClassName: 'sidebar-visible'})
    else this.setState({sidebarClassName: ''})
  }

  handleTitleClick() {
    window.location.hash = ''
  }

  render() {
    return (
      <div id="navbar-div">
        <button id="navbar-menu-button" className="ui icon button"
          onClick={this.handleMenuClick}
        >
          <i id="navbar-menu-icon" className="large sidebar icon"/>
        </button>
        <button id="navbar-title-button"
          onClick={this.handleTitleClick}
        >
          <h1 id="navbar-title-header">TWITCH AUTO-HIGHLIGHT</h1>
        </button>
        <SearchApp />
        <SidebarApp className={this.state.sidebarClassName}/>
      </div>
    )
  }

}
