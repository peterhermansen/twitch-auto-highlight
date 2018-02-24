/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export default function highlightEmbed(streamArray) {

  function highlightOptions({ vod, time }) {
    const embedOptions = {
      width: 426,
      height: 240,
      video: vod,
      autoplay: false,
      time: time + 's'
    }

    const newPlayer = new Twitch.Player(vod + time, embedOptions)
  }

  streamArray.map(highlightOptions)

}
