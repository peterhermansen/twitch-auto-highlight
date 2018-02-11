import React from 'react'
import channelFetch from '../channel/channel-fetch'

export default class SidebarApp extends React.Component {

  constructor() {
    super()
    this.state = {
      channelListData: []
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.channelList !== this.props.channelList) {
      const channelListData = await Promise.all(nextProps.channelList.map(channelFetch))
      await this.setState({channelListData: channelListData})
    }
  }

  render() {
    return (
      <div id="sidebar-div" className={this.props.className}>
      </div>
    )
  }
}
