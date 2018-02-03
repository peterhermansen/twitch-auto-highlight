/* eslint-disable no-undef */
import React from 'react'
import HighlightList from './highlight-list'

export default class HighlightApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      highlightArray: [],
      intervalID: ''
    }

    this.fetchHighlights = this.fetchHighlights.bind(this)
    this.embedHighlight = this.embedHighlight.bind(this)
  }

  componentDidMount() {
    let intervalID = setInterval(this.fetchHighlights, 1000)
    this.setState({intervalID: intervalID})
  }

  componentWillUnmount() {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
    let intervalID = setInterval(this.fetchHighlights, 1000)
    this.setState({intervalID: intervalID})
  }

  embedHighlight({ vod, time }, iterator) {
    const embedId = 'clip' + iterator
    const embedOptions = {
      width: 426,
      height: 240,
      video: vod
    }

    const player = new Twitch.Player(embedId, embedOptions)
  }

  async fetchHighlights() {
    const channel = this.props.channel

    let highlightArray = await fetch('http://localhost:3000/highlights',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          channel
        })
      }
    )

    highlightArray = await highlightArray.json()
    this.setState({
      highlightArray: highlightArray
    })
  }

  render() {
    return (
      <HighlightList highlights={ this.state.highlightArray }/>
    )
  }
}
