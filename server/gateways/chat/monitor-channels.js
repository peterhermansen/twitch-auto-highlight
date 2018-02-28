async function monitorChannels(channels, chatGateway, highlights) {
  const channelArray = await channels.findChannels()
  channelArray.map((channel) => {
    chatGateway(
      {
        id: channel.id,
        display_name: channel.display_name
      },
      highlights)
  })
}

module.exports = { monitorChannels }
