import React from 'react'
import HighlightList from './highlight-list'
import highlightEmbed from './highlight-embed'
import highlightSort from './highlight-sort'

export default class HighlightApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      highlightArray: [],
      intervalID: ''
    }

    this.fetchHighlights = this.fetchHighlights.bind(this)
  }

  componentDidMount() {
    let intervalID = setInterval(this.fetchHighlights, 100)
    this.setState({intervalID: intervalID})
  }

  componentWillUnmount() {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
    let intervalID = setInterval(this.fetchHighlights, 100)
    this.setState({intervalID: intervalID})
  }

  async fetchHighlights() {
    let channel = this.props.channel
    if (channel) channel = channel.toLowerCase()
    let highlightArray = await fetch('http://localhost:3000/highlights', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({channel})
    })
    highlightArray = await highlightArray.json()

    if (this.state.highlightArray[0] === undefined || highlightArray[0] === undefined) {
      highlightArray = highlightSort(highlightArray)
      await this.setState({highlightArray: highlightArray})
      this.state.highlightArray.map(highlightEmbed)
    }

    else if (highlightArray[0].vod !== this.state.highlightArray[0][0].vod) {
      highlightArray = highlightSort(highlightArray)
      await this.setState({highlightArray: highlightArray})
      this.state.highlightArray.map(highlightEmbed)
    }
  }

  render() {
    return (
      <HighlightList highlights={ this.state.highlightArray }/>
    )
  }
}
