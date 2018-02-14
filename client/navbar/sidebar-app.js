import React from 'react'
import channelFetch from '../channel/channel-fetch'
import SidebarDivs from './sidebar-divs'

export default class SidebarApp extends React.Component {

  constructor() {
    super()
    this.state = {
      channelListData: []
    }
  }

  render() {
    return (
      <div id="sidebar-div" className={this.props.className}>
        <SidebarDivs channelListData={this.state.channelListData}/>
      </div>
    )
  }
}
