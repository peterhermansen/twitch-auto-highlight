import React from 'react'
import TwitchAuth from './twitch/twitch-auth'
import NavbarApp from './navbar/navbar-app'
import ChannelApp from './channel/channel-app'
import HighlightApp from './highlight/highlight-app'

export default class App extends React.Component {

  render() {

    if (document.cookie.indexOf('user-id') === -1) return <TwitchAuth />

    return (
      <div>
        <NavbarApp />
        <ChannelApp />
        <HighlightApp />
      </div>
    )
  }

}
