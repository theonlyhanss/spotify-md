import type React from 'react'
import ConvertSVG from './ConvertSvg'
import { NOW_PLAYING_CSS } from '@/style'
import Text from './Text'
import { IConvertedTrackObject } from '@/helpers'
import Image from 'next/image'

export interface IPlayerProps {
  audioFeatures: SpotifyApi.AudioFeaturesResponse | null
  duration: number
  isPlaying: boolean
  progress: number | null
  track: IConvertedTrackObject
}

export default function NowPLaying({
  audioFeatures,
  duration,
  isPlaying,
  progress,
  track,
}: IPlayerProps): React.ReactNode {
  return (
    <ConvertSVG height="125" width="466">
      <Text id="title" color="standard" size="title" weight="bold">
        {isPlaying ? 'now playing' : 'last playing'}
      </Text>

      <div className="now-playing-wrapper">
        {track && (
          <div className="bar-container left">
            {[0, 1, 2].map((bar) => (
              <div
                className="bar"
                key={`left-bar-${bar}`}
                style={
                  {
                    '--offset': bar,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}

        <div
          className={isPlaying ? 'disabled' : ''}
          style={{
            alignItems: 'center',
            display: 'flex',
            background: 'rgb(255,255,255,.6)',
            border: '1px solid rgba(125, 125, 125, .3)',
            borderRadius: '.3rem',
            margin: '.5rem 0',
            padding: '.6rem',
            paddingLeft: 4,
            paddingTop: 8,
          }}
        >
          <Image
            id="cover"
            height="48"
            src={track.image ?? null}
            width="48"
            alt="Cover Image"
          />
          {/* <img id="cover" height="48" src={track.image ?? null} width="48" alt="Cover Image" /> */}

          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              marginLeft: 8,
              marginTop: -4,
            }}
          >
            <Text id="track" weight="bold">
              {`${track.name ?? ''} `.trim()}
            </Text>

            <Text color={track ? undefined : 'gray'} id="artist" size="small">
              {track.artist || 'Nothing Currently'}
            </Text>
            {track && (
              <div className="progress-bar">
                <div className={isPlaying ? '' : 'paused'} id="progress" />
              </div>
            )}
          </div>
        </div>

        {track && (
          <div className="bar-container right">
            {[0, 1, 2].map((bar) => (
              <div
                className="bar"
                key={`right-bar-${bar}`}
                style={
                  {
                    '--offset': bar,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>

      <style>{NOW_PLAYING_CSS(audioFeatures, duration, progress ?? 0)}</style>
    </ConvertSVG>
  )
}
