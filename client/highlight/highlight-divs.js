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
    if (highlights !== this.state.selectedHighlights) {
      await this.setState({selectedHighlights: highlights})
      highlightEmbed(this.state.selectedHighlights)
    }
    else this.setState({selectedHighlights: []})
  }

  renderDiv(streamArray, iterator) {
    if (!streamArray.length) return null
    const cleanDate = dateFormat(streamArray[0].date, 'fullDate')

    function renderHighlight(highlight, vod) {
      if (!highlight || highlight.vod !== streamArray[0].vod) return null
      return <div id={highlight.vod + highlight.time}
        key={highlight.vod + highlight.time}
        className="highlight-clip">
      </div>
    }

    return (
      <div id={streamArray[0].vod} key={iterator} className="stream-div">
        <button className="highlight-button"
          onClick={ () => this.showHighlights(streamArray[0].vod, streamArray) }>
          <h3 className="highlight-title">
            {(streamArray[0].channel + ' - ' + cleanDate)}
          </h3>
        </button>
        {this.state.selectedHighlights.map(renderHighlight)}
        <div className="highlight-bottom-border"></div>
      </div>
    )
  }

  render() {
    return (
      <div id="highlights">
        {this.props.highlights.map((streamArray) => {
          return streamArray.map(this.renderDiv)
        })}
      </div>

    )
  }
}
