/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
    this.embedHighlights = this.embedHighlights.bind(this)
    this.sortHighlights = this.sortHighlights.bind(this)
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

  embedHighlights(streamArray) {

    function highlightOptions({ vod, time, _id }) {
      const embedOptions = {
        width: 426,
        height: 240,
        video: vod,
        autoplay: false,
        time: time + 's'
      }

      const newPlayer = new Twitch.Player(_id, embedOptions)
    }

    streamArray.map(highlightOptions)

  }

  async fetchHighlights() {
    let channel = this.props.channel
    if (channel) channel = channel.toLowerCase()
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

    if (this.state.highlightArray[0] === undefined) {
      highlightArray = this.sortHighlights(highlightArray)
      await this.setState({
        highlightArray: highlightArray
      })
      this.state.highlightArray.map(this.embedHighlights)
    }

    else if (highlightArray[0].vod !== this.state.highlightArray[0][0].vod) {
      highlightArray = this.sortHighlights(highlightArray)
      await this.setState({
        highlightArray: highlightArray
      })
      this.state.highlightArray.map(this.embedHighlights)
    }
  }

  sortHighlights(highlights) {
    const divArray = []
    let streamArray = []

    function divideHighlights(highlight, iterator) {
      if (iterator === 0) streamArray.push(highlight)
      if (iterator > 0 && highlight.date === streamArray[0].date) {
        streamArray.push(highlight)
      }
      if (iterator > 0 && highlight.date !== streamArray[0].date) {
        divArray.push(streamArray)
        streamArray = []
        streamArray.push(highlight)
      }
      if (iterator === highlights.length - 1) {
        divArray.push(streamArray)
        streamArray = []
        streamArray.push(highlight)
      }
    }

    highlights.map(divideHighlights)
    return divArray
  }

  render() {
    return (
      <HighlightList highlights={ this.state.highlightArray }/>
    )
  }
}
