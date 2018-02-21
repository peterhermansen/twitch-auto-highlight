import React from 'react'
import channelFetch from './channel-fetch'
import channelMonitor from './channel-monitor'

export default class ChannelApp extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      channelData: {},
      name: '',
      image: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleNewHash = this.handleNewHash.bind(this)
  }

  componentWillMount() {
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
    const channelData = await channelFetch({
      channelName: [window.location.hash.slice(1).toLowerCase()]
    })
    this.setState({
      channelData: channelData,
      name: channelData[0].display_name,
      image: channelData[0].profile_image_url,
      loading: false
    })
  }

  handleClick() {
    channelMonitor(this.state.channelData)
  }

  render() {

    if (this.state.loading || !this.state.name) return <div id="channel-div"></div>

    return (
      <div id="channel-div">
        <img id="channel-img" src={this.state.image}/>
        <p id="channel-name">{this.state.name}</p>
        <button id="channel-monitor" className="ui violet button"
          onClick={this.handleClick}
          type="button"
        >
          Monitor
        </button>
      </div>
    )
  }

}
