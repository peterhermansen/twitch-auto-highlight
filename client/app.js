import React from 'react'
import NavbarApp from './navbar/navbar-app'
import ChannelApp from './channel/channel-app'
import HighlightApp from './highlight/highlight-app'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavbarApp />
        <ChannelApp />
        <HighlightApp />
      </div>
    )
  }

}
