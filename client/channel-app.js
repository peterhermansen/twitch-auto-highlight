import React from 'react'
import HighlightApp from './highlight-app'
import channelFetch from './channel-fetch'

export default class ChannelApp extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      channelData: {},
      name: '',
      image: '',
      monitorText: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleNewHash = this.handleNewHash.bind(this)
  }

  async componentWillMount() {
    const hash = window.location.hash.slice(1)
    if (hash) {
      this.setState({loading: true})
      this.handleNewHash(hash.toLowerCase())
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash)
  }

  async handleNewHash() {
    const channelData = await channelFetch(window.location.hash.slice(1).toLowerCase())
    const monitorText = (channelData.channelIsStreaming) ? 'MONITOR' : 'OFFLINE'
    this.setState({
      channelData: channelData,
      name: channelData.display_name,
      image: channelData.profile_image_url,
      monitorText: monitorText,
      loading: false
    })
  }

  handleClick() {
    const channelData = this.state.channelData
    if (channelData.channelIsStreaming) {
      fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({channelData})
      })
    }
  }

  render() {

    if (this.state.loading) return null

    if (!this.state.channelData.display_name) {
      return <HighlightApp channelData={this.props.channelData}/>
    }

    return (
      <div>
        <div id="channel-div">
          <img id="channel-img" src={this.state.image}/>
          <p id="channel-name">{this.state.name.toUpperCase()}</p>
          <button
            onClick={this.handleClick}
            type="button"
            id="channel-monitor"
          >
            {this.state.monitorText}
          </button>
        </div>
        <HighlightApp channel={this.state.name}/>
      </div>
    )
  }

}
