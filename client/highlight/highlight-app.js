import React from 'react'
import HighlightDivs from './highlight-divs'
import highlightFetch from './highlight-fetch'

export default class HighlightApp extends React.Component {

  constructor() {
    super()
    this.state = {
      highlightArray: [],
      intervalID: ''
    }

    this.getHighlights = this.getHighlights.bind(this)
  }

  componentDidMount() {
    let intervalID = setInterval(this.getHighlights, 100)
    this.setState({intervalID: intervalID})
  }

  componentWillUnmount() {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
  }

  componentWillReceiveProps() {
    if (this.state.intervalID) clearInterval(this.state.intervalID)
    let intervalID = setInterval(this.getHighlights, 100)
    this.setState({intervalID: intervalID})
  }

  async getHighlights() {
    const highlightArray = await highlightFetch(this.state.highlightArray)
    if (highlightArray) await this.setState({highlightArray: highlightArray})
  }

  render() {
    return (
      <HighlightDivs highlights={ this.state.highlightArray }/>
    )
  }
}
