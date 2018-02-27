export default function highlightSort(highlights) {
  let divArray = []
  let streamArray = []
  let highlightLength

  function compareIncrease(a, b) {
    if (a.increase < b.increase) return -1
    if (a.increase > b.increase) return 1
    return 0
  }

  function compareDate(a, b) {
    if (a[0].date > b[0].date) return -1
    if (a[0].date < b[0].date) return 1
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
    if (iterator === highlightLength - 1) {
      streamArray = streamArray.sort(compareIncrease)
      divArray.push(streamArray)
      streamArray = []
    }
  }

  highlights.map((streamArray) => {
    highlightLength = streamArray.length
    return streamArray.map(divideHighlights)
  })

  divArray = divArray.sort(compareDate)
  console.log(divArray)

  return divArray
}
