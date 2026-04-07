class Google {
  static authorize() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid+email+profile`
  }

  static async callback(code) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI
    const accessToken = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })
      .then((response) => response.json())
      .then((json) => json.access_token)

    return { accessToken }
  }

  static async me(accessToken) {
    const user = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then((response) => response.json())
      .then((json) => ({
        avatarUrl: json.picture,
        email: json.email,
        key: json.sub,
        name: json.name,
      }))

    return user
  }
}

export default Google
