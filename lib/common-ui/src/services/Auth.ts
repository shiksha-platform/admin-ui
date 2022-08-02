import axios from 'axios'

export function fetchToken(
  authUrl: string,
  username: string,
  password: string
): Promise<any> {
  const params = new URLSearchParams()
  params.append('client_id', 'registry-frontend')
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  }

  return axios.post(authUrl, params, config).catch((e) => e)
}

export function fetchUserInfo(
  userInfoEndpointUrl: string,
  token: string
): Promise<any> {
  const params = new URLSearchParams()
  params.append('client_id', 'registry-frontend')
  params.append('password', token)

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token
    }
  }

  return axios.get(userInfoEndpointUrl, config).catch((e) => e)
}
