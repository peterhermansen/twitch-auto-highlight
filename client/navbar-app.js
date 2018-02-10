import React from 'react'
import SearchApp from './search-app'
import SidebarApp from './sidebar-app'

export default class NavbarApp extends React.Component {

  constructor() {
    super()
    this.state = {
      sidebarClassName: 'hidden'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.state.sidebarClassName) this.setState({sidebarClassName: ''})
    else this.setState({sidebarClassName: 'hidden'})
  }

  render() {
    return (
      <div id="navbar-div">
        <button id="navbar-menu" className="ui icon button"
          onClick={this.handleClick}
        >
          <i id="navbar-menu-icon" className="large sidebar icon"/>
        </button>
        <h1 id="navbar-title">TWITCH AUTO-HIGHLIGHT</h1>
        <SearchApp />
        <SidebarApp className={this.state.sidebarClassName}/>
      </div>
    )
  }

}
