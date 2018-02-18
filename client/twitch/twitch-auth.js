import React from 'react'
import jwt from 'jsonwebtoken'

export default function TwitchAuth({ addUser }) {
  const url = 'https://api.twitch.tv/kraken/oauth2/authorize'
  const clientId = '?client_id=l8lprk488tfke811xasmull5ckhwbh'
  const redirectUrl = '&redirect_uri=http://localhost:3000'
  const reponseType = '&response_type=id_token'
  const scope = '&scope=user_subscriptions+openid'

  const hash = window.location.hash
  if (hash.indexOf('id_token') !== -1) {

    const token = jwt.decode(hash.slice(10, 667))

    const newCookie = 'user-id=' + token.sub + ';max-age=31536000'
    document.cookie = newCookie

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: token.sub})
    })

    window.location.hash = ''
    addUser()
  }

  return (
    <a href={url + clientId + redirectUrl + reponseType + scope}>
      <button id="twitch-auth"></button>
    </a>
  )
}
