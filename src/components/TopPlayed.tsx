import type React from 'react'
import { TOP_PLAYED_CSS, TOP_PLAYED_LIST_TITLES } from '@/style'
import { IConvertedTrackObject } from '@/helpers'
import ConvertSVG from './ConvertSvg'
import Text from './Text'
import Image from 'next/image'

export interface ITopPlayedProps {
  trackLists: IConvertedTrackObject[][]
}

export const TopPlayed: React.FC<ITopPlayedProps> = ({
  trackLists,
}: ITopPlayedProps) => {
  return (
    <ConvertSVG width="800" height="493">
      <div className="top-played-wrapper">
        {trackLists.map((list, term) => (
          <div key={term} className="top-played-container">
            <Text className="title" weight="bold" size="title" color="standard">
              {TOP_PLAYED_LIST_TITLES[term]}
            </Text>

            {list.map((track, trackIndex) => (
              <a
                key={`${term}-${trackIndex}`}
                className="track"
                href={track.href}
              >
                <Image
                  className="cover"
                  src={track.image ?? null}
                  width="48"
                  height="48"
                  alt="Cover Image"
                />
                <div className="details">
                  <Text className="name" weight="bold">
                    {`${track.name ?? ''} `.trim()}
                  </Text>

                  <Text className="artist" color="grey">
                    {track.artist}
                  </Text>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>

      <style>{TOP_PLAYED_CSS}</style>
    </ConvertSVG>
  )
}
