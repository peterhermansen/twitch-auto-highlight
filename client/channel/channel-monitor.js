export default async function channelMonitor(channelData) {

  fetch('/channels', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      token: document.cookie.slice(6),
      channelData: channelData
    })
  })

}
