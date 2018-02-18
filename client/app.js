import React from 'react'
import TwitchAuth from './twitch/twitch-auth'
import NavbarApp from './navbar/navbar-app'
import ChannelApp from './channel/channel-app'
import HighlightApp from './highlight/highlight-app'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {newUser: true}

    this.addUser = this.addUser.bind(this)
  }

  componentWillMount() {
    if (document.cookie.indexOf('user-id') >= 0) this.setState({newUser: false})
  }

  addUser() {
    this.setState({newUser: false})
  }

  render() {

    if (this.state.newUser) return <TwitchAuth addUser={this.addUser}/>

    return (
      <div>
        <NavbarApp />
        <ChannelApp />
        <HighlightApp />
      </div>
    )
  }

}
