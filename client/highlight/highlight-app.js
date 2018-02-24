import React from 'react'
import HighlightDivs from './highlight-divs'
import highlightSort from './highlight-sort'
import { socket } from '../socket.js'
import channelFetch from '../channel/channel-fetch'

export default class HighlightApp extends React.Component {

  constructor() {
    super()
    this.state = {
      highlightArray: []
    }

    this.handleNewHash = this.handleNewHash.bind(this)
  }

  async componentDidMount() {

    this.handleNewHash()

    window.addEventListener('hashchange', this.handleNewHash)

    socket.on('highlightArrayUpdate', (highlightArray) => {
      highlightArray = highlightSort(highlightArray)
      this.setState({highlightArray: highlightArray})
    })
  }

  async handleNewHash() {
    const channelData = await channelFetch({
      channelName: [window.location.hash.slice(1).toLowerCase()]
    })
    socket.emit('highlightArrayChange', {
      channelId: [channelData[0].id],
      userId: document.cookie.slice(8)
    })
  }

  render() {
    return (
      <HighlightDivs highlights={ this.state.highlightArray }/>
    )
  }
}
