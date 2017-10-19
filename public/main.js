/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const myHeaders = new Headers()
myHeaders.append('Client-ID', 'l8lprk488tfke811xasmull5ckhwbh')
myHeaders.append('Accept', 'application/vnd.twitchtv.v5+json')

const myInit = {
  method: 'GET',
  headers: myHeaders
}

let channelData = ''
let vod = ''

const fetchChannel = () => {
  fetch(('https://api.twitch.tv/helix/users?login=' + $search.value), myInit)
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.data[0] === undefined) {
        channelData = {
          display_name: 'No Results Found',
          profile_image_url: 'images/twitch-error.png'
        }
      }
      else {
        channelData = response.data[0]
      }
    })
    .then(() => {
      if (channelData.display_name !== 'No Results Found') {
        fetch(('https://api.twitch.tv/kraken/streams/' + channelData.id), myInit)
          .then(response => {
            return response.json()
          })
          .then(response => {
            if (response.stream === null) {
              channelIsStreaming = false
            }
            else {
              channelIsStreaming = true
            }
          })
          .then(() => {
            document.body.appendChild(generateChannel(channelData.display_name, channelData.profile_image_url))
            if (channelIsStreaming) {
              const monitorButton = document.querySelector('#monitor')
              monitorButton.addEventListener('click', activateMonitor)
            }
          })
      }
      else {
        document.body.appendChild(generateChannel(channelData.display_name, channelData.profile_image_url))
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
  if (channelData.display_name !== 'No Results Found') {
    if (channelIsStreaming) {
      const $button = document.createElement('button')
      $button.setAttribute('type', 'button')
      $button.id = 'monitor'
      $button.textContent = 'MONITOR'
      $div.appendChild($button)
    }
    else {
      const $p2 = document.createElement('p')
      $p2.id = 'offline'
      $p2.textContent = 'Stream Offline'
      $div.appendChild($p2)
    }
  }
  return $div
}

const searchChannel = (event) => {
  if (event.keyCode === 13) {
    fetchChannel()
    fetchPastHighlights()
  }
}

const $search = document.querySelector('#search-box')
$search.addEventListener('keydown', searchChannel)

const activateMonitor = () => {
  fetch('http://localhost:3000',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channelData
      })
    }
  )
}

let channelIsStreaming = null
let id = 1

const generateEmbed = (vodHighlight) => {
  const embedId = 'clip' + id
  const embedOptions = {
    width: 426,
    height: 240,
    video: vodHighlight.vod,
    autoplay: false,
    time: vodHighlight.time + 's'
  }
  const $div = document.createElement('div')
  $div.id = embedId
  document.body.appendChild($div)
  const player = new Twitch.Player(embedId, embedOptions)
  id++
}

const fetchVod = () => {
  if (channelData.id !== undefined) {
    fetch(('https://api.twitch.tv/kraken/channels/' + channelData.id + '/videos'), myInit)
      .then(response => {
        return response.json()
      })
      .then(response => {
        vod = response.videos[0]._id
        if (vod !== '' && vod !== undefined) {
          fetchHighlights()
        }
      })
  }
}

const fetchHighlights = () => fetch('http://localhost:3000/highlights',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      vod
    })
  }
)
  .then(response => {
    return response.json()
  })
  .then(response => {
    for (let i = 0, e = 1; i < response.length; i++, e++) {
      if (document.querySelector('#clip' + e) === null) {
        generateEmbed(response[i])
      }
    }
  })

const fetchPastHighlights = () => {
  fetch('http://localhost:3000/past-highlights',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: $search.value
      })
    }
  )
    .then(response => {
      return response.json()
    })
    .then(response => {
      generateHighlights(response)
    })
}

const generateHighlights = highlightArray => {
  sortDate(highlightArray)
}

const sortDate = highlightArray => {
  let yearSort = []
  let monthSort = []
  let daySort = []

  highlightArray.forEach(highlightObject => {
    const dateArray = []
    highlightObject.date
      .split('-')
      .forEach(dateString => {
        dateArray.push(dateString.split('T'))
      })
    dateArray[2].splice(-1, 1)
    highlightObject.dateArray = dateArray
  })

  const compareYear = (a, b) => {
    return b.dateArray[0][0] - a.dateArray[0][0]
  }

  const sliceByYear = array => {
    if (array.length === 1) {
      yearSort.push([array[0]])
    }
    if (array.length > 1) {
      for (let i = 1; i < array.length; i++) {
        if (array[i].dateArray[0][0] < array[i - 1].dateArray[0][0]) {
          yearSort.push(array.slice(0, i))
          yearSort.push(sliceByYear(array.slice(i)))
          return
        }
      }
    }
  }

  const compareMonth = (a, b) => {
    return b.dateArray[1][0] - a.dateArray[1][0]
  }

  const sliceByMonth = array => {
    const finalArray = []
    array.forEach(nestedArray => {
      let yearArray = []
      let monthArray = []
      for (let i = 0; i < nestedArray.length; i++) {
        if (nestedArray.length === 1) {
          monthArray.push(nestedArray[i])
          yearArray.push(monthArray)
        }
        else {
          monthArray.push(nestedArray[i])
          if (nestedArray[i + 1] === undefined) {
            yearArray.push(monthArray)
            monthArray = []
          }
          else if (nestedArray[i].dateArray[1][0] > nestedArray[i + 1].dateArray[1][0]) {
            yearArray.push(monthArray)
            monthArray = []
          }
        }
      }
      finalArray.push(yearArray)
    })
    return finalArray
  }

  const compareDay = (a, b) => {
    return b.dateArray[2][0] - a.dateArray[2][0]
  }

  const sliceByDay = array => {
    const finalArray = []
    array.forEach(nestedArray => {
      let yearArray = []
      nestedArray.forEach(childArray => {
        let monthArray = []
        let dayArray = []
        for (let i = 0; i < childArray.length; i++) {
          if (childArray.length === 1) {
            dayArray.push(childArray[i])
            monthArray.push(dayArray)
          }
          else {
            dayArray.push(childArray[i])
            if (childArray[i + 1] === undefined) {
              monthArray.push(dayArray)
              dayArray = []
            }
            else if (childArray[i].dateArray[2][0] > childArray[i + 1].dateArray[2][0]) {
              monthArray.push(dayArray)
              dayArray = []
            }
          }
        }
        yearArray.push(monthArray)
      })
      finalArray.push(yearArray)
    })
    return finalArray
  }

  const cleanArray = (array) => {
    return array.filter(Boolean)
  }

  highlightArray.sort(compareYear)
  sliceByYear(highlightArray)
  yearSort = cleanArray(yearSort)
  yearSort.forEach(array => {
    array.sort(compareMonth)
  })
  console.log(yearSort)
  monthSort = sliceByMonth(yearSort)
  monthSort.forEach(array => {
    array.forEach(nestedArray => {
      nestedArray.sort(compareDay)
    })
  })
  console.log(monthSort)
  daySort = sliceByDay(monthSort)
  console.log(daySort)
}
