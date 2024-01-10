import React from 'react'
import {
  TEXT_COLORS,
  TEXT_FONT_FAMILIES,
  TEXT_SIZES,
  TEXT_WEIGHTS,
} from '@/style'

interface ITextParameters {
  children?: React.ReactNode | string
  color?: string
  fontFamily?: string
  size?: string
  weight?: string
  className?: string
  id?: string
}

/**
 * Simple text line with styles as props.
 *
 * @param {string} color Key for text color option.
 * @param {string} fontFamily Key for text font family option.
 * @param {string} size Key for text size option.
 * @param {string} weight Key for text weight option.
 * @returns {React.FC} Functional React component.
 */
export default function Text({
  children = '',
  color = 'default',
  fontFamily = 'default',
  size = 'default',
  weight = 'default',
  ...props
}: ITextParameters): React.ReactNode {
  return (
    <p
      style={{
        color: TEXT_COLORS[color as keyof typeof TEXT_COLORS],
        fontFamily:
          TEXT_FONT_FAMILIES[fontFamily as keyof typeof TEXT_FONT_FAMILIES],
        fontSize: `${TEXT_SIZES[size as keyof typeof TEXT_SIZES]}px`,
        fontWeight: TEXT_WEIGHTS[weight as keyof typeof TEXT_WEIGHTS],
        lineHeight: 1.5,
      }}
      {...props}
    >
      {children}
    </p>
  )
}
