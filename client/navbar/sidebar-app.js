import React from 'react'
import channelFetch from '../channel/channel-fetch'
import SidebarDivs from './sidebar-divs'
import io from 'socket.io-client'

export default class SidebarApp extends React.Component {

  constructor() {
    super()
    this.state = {
      channelArrayData: [],
      socket: io('/' + document.cookie.slice(6))
    }

    this.updateChannelArray = this.updateChannelArray.bind(this)
  }

  async componentDidMount() {
    this.state.socket.emit('channelArrayUpdate', document.cookie.slice(6))
    this.state.socket.on('channelArrayNew', (userObject) => {
      this.updateChannelArray(userObject.channelArray)
    })
  }

  async updateChannelArray(channelArray) {
    const channelArrayData = await channelFetch({channelId: channelArray})
    this.setState({channelArrayData: channelArrayData})
  }

  render() {
    return (
      <div id="sidebar-div" className={this.props.className}>
        <SidebarDivs channelArrayData={this.state.channelArrayData}/>
      </div>
    )
  }
}
