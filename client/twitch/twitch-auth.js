import React from 'react'
import validateToken from './twitch-validate'

export default function TwitchAuth({ addUser }) {
  const url = 'https://api.twitch.tv/kraken/oauth2/authorize'
  const clientId = '?client_id=l8lprk488tfke811xasmull5ckhwbh'
  const redirectUrl = '&redirect_uri=https://stream-highlights.herokuapp.com/'
  const reponseType = '&response_type=id_token'
  const scope = '&scope=user_subscriptions+openid'

  const hash = window.location.hash
  if (hash.indexOf('id_token') !== -1) {
    validateToken(hash, addUser)
  }

  return (
    <div id="login-div">
      <p id="login-text">Login with Twitch to access stream highlights.</p>
      <a href={url + clientId + redirectUrl + reponseType + scope}>
        <button id="login-button">Log In</button>
      </a>
    </div>
  )
}
