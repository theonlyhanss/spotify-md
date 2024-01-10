import NowPLaying from '@/components/NowPlaying'
import { convertTrackToMinimumData, setSvgHeader } from '@/helpers'
import { spotifyAPI } from '@/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = await spotifyAPI.refreshAccessToken()
    spotifyAPI.setAccessToken(token.body.access_token)

    const nowPlaying = (await spotifyAPI.getMyCurrentPlayingTrack()).body

    let { item } = nowPlaying

    const { is_playing: isPlaying = false, progress_ms: progress = 0 } =
      nowPlaying

    // Get last played if it's not playing.
    if (!item) {
      const response = await spotifyAPI.getMyRecentlyPlayedTracks({
        limit: 1,
      })
      item = response.body.items[0].track
    }

    // If the link was clicked, reroute them to the href.
    if (req.query.open) {
      if (item?.external_urls) {
        res.writeHead(303, {
          Location: item.external_urls.spotify,
        })
        return res.end()
      }
      return res.status(200).end()
    }

    // The music bars are colored based on the songs danceability, energy and happiness
    // And they move to the beat of the song :)
    const audioFeatures: SpotifyApi.AudioFeaturesResponse | null = Object.keys(
      item,
    ).length
      ? (await spotifyAPI.getAudioFeaturesForTrack(item.id)).body
      : null

    // Minimum data for the track.
    const track = await convertTrackToMinimumData(item)

    // Getting duration of the track.
    const { duration_ms: duration } = item

    setSvgHeader(res)

    // Generating the component and rendering it
    const text: string = renderToString(
      NowPLaying({
        audioFeatures,
        duration,
        isPlaying,
        progress,
        track,
      }) as ReactElement,
    )

    return res.send(text)
  } catch (error) {
    return res.status(400).json(error)
  }
}
