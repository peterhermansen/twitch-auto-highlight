export default async function validateToken(hash, addUser) {
  const token = hash.slice((hash.indexOf('=') + 1), hash.indexOf('&'))

  let validation = await fetch('/validation', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token: token})
  })
  validation = await validation.json()

  if (validation) {
    const newCookie = 'token=' + token + ';max-age=31536000'
    document.cookie = newCookie
    window.location.hash = ''
    addUser()
  }
}
