export default async function channelMonitor(channelData) {

  fetch('http://localhost:3000/monitor', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({channelData})
  })

  fetch('http://localhost:3000/channels', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({channelData})
  })

}
