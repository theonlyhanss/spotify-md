import React from 'react'
import { AUTH_CSS } from '@/style'
import ConvertSVG from './ConvertSvg'
import Text from './Text'

export interface IAuthParameters {
  refreshToken: string
}

/**
 * Pretty way to display refresh token in development mode.
 *
 * @param {string} refreshToken Spotify refresh token.
 * @returns {React.ReactNode} Functional React component.
 */
export function Auth({ refreshToken }: IAuthParameters): React.ReactNode {
  return (
    <ConvertSVG width="900" height="212">
      <div id="auth-wrapper">
        <Text color="standard" size="title" weight="bold">
          Set your SPOTIFY_REFRESH_TOKEN with token below
        </Text>

        <Text color="gray" fontFamily="default">
          {refreshToken}
        </Text>
      </div>

      <style>{AUTH_CSS}</style>
    </ConvertSVG>
  )
}
