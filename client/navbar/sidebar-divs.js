import React from 'react'

export default function SidebarDivs({ channelArrayData }) {
  return (
    <div id="sidebar-channels-div">
      <p id="sidebar-title">Followed Channels</p>
      {channelArrayData.map(renderButton)}
    </div>
  )

}

function handleClick(channel) {
  window.location.hash = channel
}

function renderButton(channel, iterator) {
  return (
    <button className="sidebar-channel-button" key={iterator}
      onClick={() => handleClick(channel.display_name)}
    >
      <img className="sidebar-channel-img" src={channel.profile_image_url} />
      <p className="sidebar-channel-name">{channel.display_name}</p>
    </button>
  )
}
