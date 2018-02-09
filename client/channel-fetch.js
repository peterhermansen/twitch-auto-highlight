export default async function channelFetch(value) {

  const myHeaders = new Headers()
  myHeaders.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
  myHeaders.append('Accept', 'application/vnd.twitchtv.v5+json')

  const fetchInit = { method: 'GET', headers: myHeaders }

  let channelResponse = await fetch(('https://api.twitch.tv/helix/users?login=' + value), fetchInit)
  channelResponse = await channelResponse.json()
  channelResponse = channelResponse.data[0]

  if (channelResponse === undefined) {
    return {
      display_name: 'No Results Found',
      profile_image_url: 'images/twitch-error.png'
    }
  }

  else {
    let streamResponse = await fetch(('https://api.twitch.tv/kraken/streams/' + channelResponse.id), fetchInit)
    streamResponse = await streamResponse.json()
    if (streamResponse.stream === null) Object.assign(channelResponse, {channelIsStreaming: false})
    else Object.assign(channelResponse, {channelIsStreaming: true})
    return channelResponse
  }

}
