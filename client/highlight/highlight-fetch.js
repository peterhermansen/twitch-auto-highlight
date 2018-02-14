import highlightSort from './highlight-sort'

export default async function highlightFetch(currentHighlightArray) {

  let channel = window.location.hash.slice(1)
  if (channel) channel = channel.toLowerCase()
  let highlightArray = await fetch('http://localhost:3000/highlights', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({channel})
  })
  highlightArray = await highlightArray.json()
  highlightArray = highlightSort(highlightArray)
  return highlightArray

}
