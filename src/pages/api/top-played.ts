import { TopPlayed } from '@/components/TopPlayed'
import {
  IConvertedTrackObject,
  convertTrackToMinimumData,
  setSvgHeader,
} from '@/helpers'
import { spotifyAPI } from '@/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cache, type ReactElement } from 'react'
import { renderToString } from 'react-dom/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = await spotifyAPI.refreshAccessToken()
    spotifyAPI.setAccessToken(token.body.access_token)

    const timeRanges: Array<'long_term' | 'medium_term' | 'short_term'> = [
      'long_term',
      'medium_term',
      'short_term',
    ]

    const topPlayedTracks: SpotifyApi.TrackObjectFull[][] = await Promise.all(
      timeRanges.map(async (timeRange) => {
        const getTrack = spotifyAPI.getMyTopTracks({
          time_range: timeRange,
          limit: 5,
        })
        const topTracks = await getTrack
        return topTracks.body.items
      }),
    )

    const topPlayedConvertedTracks: IConvertedTrackObject[][] =
      await Promise.all(
        topPlayedTracks.map(async (tracks) => {
          return await Promise.all(
            tracks.map(async (track) => await convertTrackToMinimumData(track)),
          )
        }),
      )

    const text: string = renderToString(
      TopPlayed({ trackLists: topPlayedConvertedTracks }) as ReactElement,
    )

    // Set Response as SVG Image
    setSvgHeader(res)

    // Set Cache
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=600',
    ) // 86400 seconds = 1 days

    return res.send(text)
  } catch (error) {
    return res.status(400).json(error)
  }
}
