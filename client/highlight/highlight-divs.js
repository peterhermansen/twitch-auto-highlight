import React from 'react'
import dateFormat from 'dateformat'

export default function HighlightDivs({ highlights }) {

  return (

    <div id="highlights">
      {highlights.map(renderDiv)}
    </div>

  )
}

function renderDiv(streamArray, iterator) {

  const cleanDate = dateFormat(streamArray[0].date, 'fullDate')

  function renderHighlight(highlight) {
    return <div id={highlight._id} key={highlight._id} className="highlight-clip"></div>
  }

  return <div id={streamArray[0].vod} key={iterator} className="stream-div">
    <h3 className="highlight-title">{streamArray[0].channel + ' - ' + cleanDate}</h3>
    {streamArray.map(renderHighlight)}
  </div>
}
