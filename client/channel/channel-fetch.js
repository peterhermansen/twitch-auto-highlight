export default async function channelFetch({ channelName, channelId }) {
  const headers = new Headers()
  headers.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
  headers.append('Accept', 'application/vnd.twitchtv.v5+json')
  const fetchInit = { method: 'GET', headers: headers }

  function arrayToQuery(array) {
    const queryString = array.reduce((queryString, string, index) => {
      if (!index) return queryString + string
      return queryString + '+' + string
    }, '')
    return queryString
  }
  console.log(arrayToQuery(channelId))
  // if (!channelName) {
  //
  //
  // }
  //
  // let channelResponse = await fetch(
  //   ('https://api.twitch.tv/helix/users?login=' + value),
  //   fetchInit
  // )
  // channelResponse = await channelResponse.json()
  // console.log(value, channelResponse)
  // if (channelResponse.status === '400') {
  //   return {
  //     display_name: 'No Results Found',
  //     profile_image_url: 'images/twitch-error.png'
  //   }
  // }
  //
  // if (!channelResponse.data) {
  //   return {
  //     display_name: '',
  //     profile_image_url: ''
  //   }
  // }
  //
  // if (!channelResponse.data[0]) {
  //   channelResponse = await fetch(
  //     ('https://api.twitch.tv/helix/users?id=' + value),
  //     fetchInit
  //   )
  //   channelResponse = await channelResponse.json()
  // }
  //
  // return channelResponse.data[0]

}
