import React from 'react'
import HighlightDivs from './highlight-divs'
import highlightSort from './highlight-sort'
import channelFetch from '../channel/channel-fetch'
import io from 'socket.io-client'

export default class HighlightApp extends React.Component {

  constructor() {
    super()
    this.state = {
      highlightArray: [],
      socket: io('/' + document.cookie.slice(6))
    }

    this.handleNewHash = this.handleNewHash.bind(this)
  }

  async componentDidMount() {

    this.handleNewHash()

    window.addEventListener('hashchange', this.handleNewHash)

    this.state.socket.on('highlightArrayUpdate', (highlightArray) => {
      highlightArray = highlightSort(highlightArray)
      this.setState({highlightArray: highlightArray})
    })
  }

  async handleNewHash() {
    const channelData = await channelFetch({
      channelName: [window.location.hash.slice(1).toLowerCase()]
    })
    this.state.socket.emit('highlightArrayChange', {
      channelId: [channelData[0].id],
      token: document.cookie.slice(6)
    })
  }

  render() {
    return (
      <HighlightDivs highlights={ this.state.highlightArray }/>
    )
  }
}
