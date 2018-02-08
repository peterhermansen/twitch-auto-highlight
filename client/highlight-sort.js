export default function highlightSort(highlights) {
  const divArray = []
  let streamArray = []

  function divideHighlights(highlight, iterator) {
    if (iterator === 0) streamArray.push(highlight)
    if (iterator > 0 && highlight.date === streamArray[0].date) {
      streamArray.push(highlight)
    }
    if (iterator > 0 && highlight.date !== streamArray[0].date) {
      divArray.push(streamArray)
      streamArray = []
      streamArray.push(highlight)
    }
    if (iterator === highlights.length - 1) {
      divArray.push(streamArray)
      streamArray = []
      streamArray.push(highlight)
    }
  }

  highlights.map(divideHighlights)
  return divArray
}
