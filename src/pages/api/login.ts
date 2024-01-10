import { spotifyAPI } from '@/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const scopes = [
    // Listening History
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',

    // Spotify Connect
    'user-read-currently-playing',
    'user-read-playback-state',
  ]

  const authorizeURL = spotifyAPI.createAuthorizeURL(scopes, '')

  res.redirect(307, authorizeURL)
}
