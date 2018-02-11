import React from 'react'

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
      </div>
    )
  }
}
