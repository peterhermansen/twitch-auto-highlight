const myHeaders = new Headers()
myHeaders.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
myHeaders.append('Accept', 'application/vnd.twitchtv.v5+json')

const myInit = {
  method: 'GET',
  headers: myHeaders
}

let channelId = ''

const fetchChannel = () => {
  fetch(('https://api.twitch.tv/helix/users?login=' + $search.value), myInit)
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.data[0] === undefined) {
        return {
          display_name: 'No Results Found',
          profile_image_url: 'images/twitch-error.png'
        }
      }
      else {
        return response.data[0]
      }
    })
    .then(response => {
      channelId = response.id
      document.body.appendChild(generateChannel(response.display_name, response.profile_image_url))
    })
}

const fetchChannelStatus = () => {
  fetch(('https://api.twitch.tv/kraken/streams/' + channelId), myInit)
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.stream !== null) {
        console.log('Channel is Live!')
      }
      else {
        console.log('Channel is Offline')
      }
    })
}

const generateChannel = (displayName, imgUrl) => {
  if (document.querySelector('#channel-div') !== null) {
    document.querySelector('#channel-div').remove()
  }
  const $div = document.createElement('div')
  const $p = document.createElement('p')
  const $img = document.createElement('img')
  $p.id = 'channel-name'
  $p.textContent = displayName
  $img.id = 'channel-img'
  $img.setAttribute('src', imgUrl)
  $div.id = 'channel-div'
  $div.appendChild($img)
  $div.appendChild($p)
  return $div
}

const searchChannel = (event) => {
  if (event.keyCode === 13) {
    fetchChannel()
  }
}

const $search = document.querySelector('#search-box')
$search.addEventListener('keydown', searchChannel)
