import { Auth } from '@/components/Auth'
import { setSvgHeader } from '@/helpers'
import { spotifyAPI } from '@/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code ?? null

  if (!code) {
    return res.redirect(307, `${process.env.BASE_URL}/api/login`)
  }

  try {
    const spotify = await spotifyAPI.authorizationCodeGrant(code.toString())
    const { refresh_token: refreshToken } = spotify.body
    const text = renderToString(
      Auth({
        refreshToken,
      }) as ReactElement,
    )

    setSvgHeader(res)

    return res.send(text)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
