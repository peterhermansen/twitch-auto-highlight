import React from 'react'

export default function HighlightList({ highlights }) {

  return (

    <div id="highlights">
      {highlights.map(renderHighlight)}
    </div>

  )
}

function renderHighlight({ vod }, iterator) {
  return <div id={'clip' + iterator} key={iterator}></div>
}
