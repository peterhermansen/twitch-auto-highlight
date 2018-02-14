import React from 'react'
import HighlightDivs from './highlight-divs'
import highlightFetch from './highlight-fetch'

export default class HighlightApp extends React.Component {

  constructor() {
    super()
    this.state = {
      highlightArray: [],
      channel: ''
    }

    this.updateHighlightArray = this.updateHighlightArray.bind(this)
  }

  async componentDidMount() {
    this.updateHighlightArray()
  }

  handleNewHash() {
    this.setState({channel: window.location.hash.slice(1)})
  }

  async updateHighlightArray() {
    const highlightArray = await highlightFetch(this.state.highlightArray)
    if (highlightArray) await this.setState({highlightArray: highlightArray})
  }

  render() {
    return (
      <HighlightDivs highlights={ this.state.highlightArray }/>
    )
  }
}
