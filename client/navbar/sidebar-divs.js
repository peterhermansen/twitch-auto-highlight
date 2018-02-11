import React from 'react'

export default function SidebarDivs({ channelListData }) {

  return (
    <div id="sidebar-channels-div">
      <p id="sidebar-title">Followed Channels</p>
      {channelListData.map(renderDiv)}
    </div>
  )

}

function handleClick(channel) {
  window.location.hash = channel
}

function renderDiv(channel, iterator) {
  return (
    <div className="sidebar-channel" key={iterator}>
      <button className="sidebar-channel-button"
        onClick={() => handleClick(channel.display_name)}
      >
        <img className="sidebar-channel-img" src={channel.profile_image_url} />
        <p className="sidebar-channel-name">{channel.display_name}</p>
      </button>
    </div>
  )
}
