import React from 'react'
import HighlightApp from './highlight-app'

export default class ChannelApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      image: '',
      monitorText: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.channelData.display_name !== nextProps.channelData.display_name) {
      this.setState({
        name: nextProps.channelData.display_name,
        image: nextProps.channelData.profile_image_url
      })
      if (!nextProps.channelData.channelIsStreaming) this.setState({monitorText: 'OFFLINE'})
      else this.setState({monitorText: 'MONITOR'})
    }
  }

  handleClick() {
    const channelData = this.props.channelData
    if (this.props.channelData.channelIsStreaming) {
      fetch('http://localhost:3000',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            channelData
          })
        }
      )
    }
  }

  render() {

    if (!this.props.channelData.display_name) {
      return <HighlightApp channelData={this.props.channelData}/>
    }

    return (
      <div>
        <div id="channel-div">
          <img id="channel-img" src={this.state.image}/>
          <p id="channel-name">{this.state.name}</p>
          <button
            onClick={this.handleClick}
            type="button"
            id="monitor"
          >{this.state.monitorText}</button>
        </div>
        <HighlightApp channel={this.state.name}/>
      </div>
    )
  }

}
