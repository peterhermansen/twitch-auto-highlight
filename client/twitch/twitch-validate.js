export default async function validateToken(hash, addUser) {
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
