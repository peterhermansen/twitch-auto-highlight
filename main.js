const $search = document.querySelector('#search')

const myHeaders = new Headers()
myHeaders.append('Authorization', 'OAuth 5rijohkbkardshfd8hj0modeyme9qe')
myHeaders.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')

const myInit = {
  method: 'GET',
  headers: myHeaders
}

const searchChannel = (event) => {
  if (event.keyCode === 13) {
    fetchChannel()
  }
}

$search.addEventListener('keydown', searchChannel)

const fetchChannel = () => {
  fetch(('https://api.twitch.tv/helix/users?login=' + $search.value), myInit)
    .then(response => {
      return response.json()
    })
    .then(response => {
      return response.data[0]
    })
}
