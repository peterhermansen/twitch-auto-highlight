import React from 'react'
import dateFormat from 'dateformat'
import highlightEmbed from './highlight-embed'

export default class HighlightDivs extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedHighlights: []
    }

    this.renderDiv = this.renderDiv.bind(this)
    this.showHighlights = this.showHighlights.bind(this)
  }

  async showHighlights(vod, highlights) {
    const selectedHighlights = highlights.filter(vodArray => vodArray[0].vod === vod)
    if (selectedHighlights[0] !== this.state.selectedHighlights) {
      await this.setState({selectedHighlights: selectedHighlights[0]})
      highlightEmbed(this.state.selectedHighlights)
    }
    else this.setState({selectedHighlights: []})
  }

  renderDiv(streamArray, iterator) {
    const cleanDate = dateFormat(streamArray[0].date, 'fullDate')

    function renderHighlight(highlight, vod) {
      if (!highlight || highlight.vod !== streamArray[0].vod) return null
      return <div id={highlight._id} key={highlight._id} className="highlight-clip"></div>
    }

    return (
      <div id={streamArray[0].vod} key={iterator} className="stream-div">
        <button className="highlight-button"
          onClick={ () => this.showHighlights(streamArray[0].vod, this.props.highlights) }>
          <h3 className="highlight-title">{streamArray[0].channel + ' - ' + cleanDate}</h3>
        </button>
        {this.state.selectedHighlights.map(renderHighlight)}
      </div>
    )
  }

  render() {
    return (
      <div id="highlights">
        {this.props.highlights.map(this.renderDiv)}
      </div>

    )
  }
}
