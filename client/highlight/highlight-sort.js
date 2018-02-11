export default function highlightSort(highlights) {
  let divArray = []
  let streamArray = []

  function compareIncrease(a, b) {
    if (a.increase < b.increase) return -1
    if (a.increase > b.increase) return 1
    return 0
  }

  function divideHighlights(highlight, iterator) {
    if (iterator === 0) streamArray.push(highlight)
    if (iterator > 0 && highlight.date === streamArray[0].date) {
      streamArray.push(highlight)
    }
    if (iterator > 0 && highlight.date !== streamArray[0].date) {
      streamArray = streamArray.sort(compareIncrease)
      divArray.push(streamArray)
      streamArray = []
      streamArray.push(highlight)
    }
    if (iterator === highlights.length - 1) {
      streamArray = streamArray.sort(compareIncrease)
      divArray.push(streamArray)
      streamArray = []
      streamArray.push(highlight)
    }
  }

  highlights.map(divideHighlights)
  return divArray
}
