export default async function channelFetch({ channelName, channelId }) {
  const headers = new Headers()
  headers.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
  headers.append('Accept', 'application/vnd.twitchtv.v5+json')
  const fetchInit = { method: 'GET', headers: headers }

  let channelResponse
  let queryCombine
  let queryString

  if (!channelId && !channelName[0]) {
    return [{
      id: '',
      display_name: '',
      profile_image_url: ''
    }]
  }

  function arrayToQuery(array) {
    queryCombine = (!channelName) ? 'id=' : 'login='
    const queryString = array.reduce((queryString, string, index) => {
      if (!index) return queryString + string
      return queryString + '&' + queryCombine + string
    }, '')
    return queryString
  }

  if (!channelName) queryString = arrayToQuery(channelId)
  else queryString = arrayToQuery(channelName)

  channelResponse = await fetch(
    ('https://api.twitch.tv/helix/users?' + queryCombine + queryString),
    fetchInit
  )
  channelResponse = await channelResponse.json()

  if (!channelResponse.data[0]) {
    return [{
      id: '',
      display_name: 'No Results Found',
      profile_image_url: 'images/twitch-error.png'
    }]
  }

  return channelResponse.data

}
