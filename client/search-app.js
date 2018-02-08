import React from 'react'
import ChannelApp from './channel-app'

export default class SearchApp extends React.Component {

  constructor() {
    super()
    this.state = {
      channelData: {},
      channelIsStreaming: ''
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.fetchChannelData = this.fetchChannelData.bind(this)
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.fetchChannelData(event.target.value)
    }
  }

  async fetchChannelData(value) {

    const myHeaders = new Headers()
    myHeaders.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
    myHeaders.append('Accept', 'application/vnd.twitchtv.v5+json')

    const fetchInit = { method: 'GET', headers: myHeaders }

    let channelResponse = await fetch(('https://api.twitch.tv/helix/users?login=' + value), fetchInit)
    channelResponse = await channelResponse.json()
    channelResponse = channelResponse.data[0]

    if (channelResponse === undefined) {
      await this.setState({channelData: {
        display_name: 'No Results Found',
        profile_image_url: 'images/twitch-error.png'
      }})
    }

    else {
      let streamResponse = await fetch(('https://api.twitch.tv/kraken/streams/' + channelResponse.id), fetchInit)
      streamResponse = await streamResponse.json()
      if (streamResponse.stream === null) Object.assign(channelResponse, {channelIsStreaming: false})
      else Object.assign(channelResponse, {channelIsStreaming: true})
      this.setState({channelData: channelResponse})
    }

  }

  render() {
    return (
      <div>
        <div id="search">
          <input
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            id="search-box"
            type="text"
            placeholder="Search Channels"
          />
          <img id="search-icon" src="images/search-icon.svg"/>
        </div>
        <ChannelApp
          channelData={this.state.channelData}
          channelIsStreaming={this.state.channelIsStreaming}/>
      </div>
    )
  }

}
