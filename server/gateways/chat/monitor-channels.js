async function monitorChannels(channels, chatGateway) {
  const channelArray = await channels.findChannels()
  channelArray.map((channel) => {
    chatGateway({
      id: channel.id,
      display_name: channel.display_name
    }).monitorChat()
  })
}

module.exports = { monitorChannels }
