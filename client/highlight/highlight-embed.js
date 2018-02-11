/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export default function highlightEmbed(streamArray) {

  function highlightOptions({ vod, time, _id }) {
    const embedOptions = {
      width: 426,
      height: 240,
      video: vod,
      autoplay: false,
      time: time + 's'
    }

    const newPlayer = new Twitch.Player(_id, embedOptions)
  }

  streamArray.map(highlightOptions)

}
