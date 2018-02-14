import React from 'react'
import channelFetch from '../channel/channel-fetch'
import SidebarDivs from './sidebar-divs'
import io from 'socket.io-client'
const socket = io()

export default class SidebarApp extends React.Component {

  constructor() {
    super()
    this.state = {channelListData: []}

    this.updateChannelList = this.updateChannelList.bind(this)
  }

  async componentDidMount() {
    let channelList = await fetch('http://localhost:3000/channels')
    channelList = await channelList.json()
    this.updateChannelListData(channelList)
  }

  async updateChannelListData(channelList) {
    const channelListData = await Promise.all(channelList.map(channelFetch))
    this.setState({channelListData: channelListData})
  }

  render() {
    return (
      <div id="sidebar-div" className={this.props.className}>
        <SidebarDivs channelListData={this.state.channelListData}/>
      </div>
    )
  }
}
