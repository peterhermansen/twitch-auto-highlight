import React from 'react'
import HighlightDivs from './highlight-divs'
import highlightSort from './highlight-sort'
import { socket } from '../socket.js'

export default class HighlightApp extends React.Component {

  constructor() {
    super()
    this.state = {
      highlightArray: [],
      channel: ''
    }

    this.handleNewHash = this.handleNewHash.bind(this)
  }

  async componentDidMount() {

    this.handleNewHash()

    window.addEventListener('hashchange', this.handleNewHash)

    socket.on('highlightArrayUpdate', (highlightArray) => {
      console.log(highlightArray)
      highlightArray = highlightSort(highlightArray)
      this.setState({highlightArray: highlightArray})
    })
  }

  async handleNewHash() {
    await this.setState({channel: window.location.hash.slice(1).toLowerCase()})
    socket.emit('highlightArrayChange', this.state.channel)
  }

  render() {
    return (
      <HighlightDivs highlights={ this.state.highlightArray }/>
    )
  }
}
