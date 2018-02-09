import React from 'react'
import NavbarApp from './navbar-app'
import ChannelApp from './channel-app'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavbarApp />
        <ChannelApp />
      </div>
    )
  }

}
