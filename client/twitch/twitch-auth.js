import React from 'react'

export default async function TwitchAuth({ addUser }) {
  const url = 'https://api.twitch.tv/kraken/oauth2/authorize'
  const clientId = '?client_id=l8lprk488tfke811xasmull5ckhwbh'
  const redirectUrl = '&redirect_uri=http://localhost:3000'
  const reponseType = '&response_type=id_token'
  const scope = '&scope=user_subscriptions+openid'

  const hash = window.location.hash
  if (hash.indexOf('id_token') !== -1) {

    const token = hash.slice(10, 667)

    let validation = await fetch('http://localhost:3000/validation', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token: token})
    })

    if (validation.status) {
      const newCookie = 'token=' + token + ';max-age=31536000'
      document.cookie = newCookie

      window.location.hash = ''
      addUser()
    }
  }

  return (
    <a href={url + clientId + redirectUrl + reponseType + scope}>
      <button id="twitch-auth"></button>
    </a>
  )
}
