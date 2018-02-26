const fetch = require('node-fetch')
const jwkToPem = require('jwk-to-pem')
const jwt = require('jsonwebtoken')

async function validateToken(token) {

  let key = await fetch('https://api.twitch.tv/api/oidc/keys')
  key = await key.json()
  key = jwkToPem(key.keys[0])

  return jwt.verify(token, key)
}

module.exports = { validateToken }
